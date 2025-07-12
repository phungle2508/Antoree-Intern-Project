import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, Star, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { courses } from '../../data';
import { getCart, updateCartItemQuantity, removeCartItem, setCart } from '../../services/cartService';
import { CartItem } from '../../types';

interface CartProps {
    cart?: CartItem[];
}

const Cart = ({ cart: propCart }: CartProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const cart = propCart || getCart() || [];
        setCartItems(cart);
        setLoading(false);
    }, [propCart]);

    const updateQuantity = (courseId: string, newQuantity: number) => {
        const result = updateCartItemQuantity(courseId, newQuantity);
        const updatedCart = getCart() || [];
        setCartItems(updatedCart);

        console.log(result);
    };

    const removeItem = (courseId: string) => {
        const result = removeCartItem(courseId);
        const updatedCart = getCart() || [];
        setCartItems(updatedCart);

        console.log(result);
    };

    const clearCart = () => {
        setCart([]);
        setCartItems([]);

    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const course = courses.find(c => c.id === item.id);
            return total + (course?.price || 0) * item.quantity;
        }, 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="w-8 h-8 border-t-2 border-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Browse our courses and add them to your cart to get started.
                </p>
                <Link to="/courses" className="btn bg-orange-500 hover:bg-orange-600 text-white">
                    Browse Courses
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {/* Cart Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Shopping Cart ({getTotalItems()} items)
                        </h2>
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label={isCollapsed ? "Expand cart" : "Collapse cart"}
                        >
                            {isCollapsed ? (
                                <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
                            ) : (
                                <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                    <button
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                        Clear Cart
                    </button>
                </div>
                {isCollapsed && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Total: ${getTotalPrice().toFixed(2)}
                    </div>
                )}
            </div>

            {/* Cart Items - Collapsible */}
            <div className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                isCollapsed 
                    ? 'max-h-0 opacity-0' 
                    : 'max-h-[2000px] opacity-100'
            }`}>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map((item) => {
                        const course = courses.find(c => c.id === item.id);
                        if (!course) return null;

                        return (
                            <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Course Image */}
                                    <div className="flex-shrink-0">
                                        <Link to={`/courses/${course.id}`}>
                                            <img
                                                src={course.imageUrl}
                                                alt={course.title}
                                                className="w-full sm:w-32 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                                            />
                                        </Link>
                                    </div>

                                    {/* Course Details */}
                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex-grow mb-4 sm:mb-0">
                                                <Link
                                                    to={`/courses/${course.id}`}
                                                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                                >
                                                    {course.title}
                                                </Link>

                                                <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                {/* Course Meta */}
                                                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center">
                                                        <Star size={14} className="mr-1 text-yellow-500" />
                                                        <span>{course.rating.toFixed(1)} ({course.reviewCount})</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Users size={14} className="mr-1" />
                                                        <span>{course.enrolledStudents.toLocaleString()} students</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock size={14} className="mr-1" />
                                                        <span>{course.level}</span>
                                                    </div>
                                                </div>

                                                {/* Course Tags */}
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs rounded-md">
                                                        {course.category}
                                                    </span>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-md">
                                                        {course.language}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price and Actions */}
                                            <div className="flex flex-col items-end space-y-3">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                        ${((course.price ?? 0) * item.quantity).toFixed(2)}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        ${(course.price ?? 0).toFixed(2)} each
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                                                >
                                                    <Trash2 size={14} className="mr-1" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Cart Summary */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total ({getTotalItems()} items)
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${getTotalPrice().toFixed(2)}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/courses"
                                className="btn btn-outline text-center"
                            >
                                Continue Shopping
                            </Link>
                            <button className="btn bg-orange-500 hover:bg-orange-600 text-white">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;