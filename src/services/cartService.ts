// Helper functions for cookiesimpor 
import { toast } from 'react-toastify';
import { dispatchCookieUpdate, getCookie, removeCookie, setCookie } from '../lib/cookie';
import { CartItem } from '../types';

// Cart
export function setCart(cart: CartItem[]) {
  setCookie('cart', JSON.stringify(cart));
  dispatchCookieUpdate();
}
export function getCart(): CartItem[] | null {
  const val = getCookie('cart');
  return val ? JSON.parse(decodeURIComponent(val)) : null;
}
export function removeCart() {
  removeCookie('cart');
}
export function appendCart(itemId: string, quantity: number = 1): void {
  try {
    const cart = getCart() || [];
    const idx = cart.findIndex((item: CartItem) => item.id === itemId);
    if (idx !== -1) {
      cart[idx].quantity += quantity;
      setCart(cart);
      toast.success('Item quantity updated in cart');
      return;
    }
    cart.push({ id: itemId, quantity });
    setCart(cart);
    toast.success('Item added to cart');
  } catch {
    toast.error('Error appending item to cart');
  }
}
export function removeCartItem(itemId: string): void {
  try {
    const cart = getCart() || [];
    const idx = cart.findIndex((item: CartItem) => item.id === itemId);
    if (idx === -1) {
      toast.warning('Item not found in cart');
      return;
    }
    const updated = cart.filter((item: CartItem) => item.id !== itemId);
    setCart(updated);
    toast.success('Item removed from cart');
  } catch {
    toast.error('Error removing item from cart');
  }
}
export function updateCartItemQuantity(itemId: string, quantity: number): void {
  try {
    const cart = getCart() || [];
    const idx = cart.findIndex((item: CartItem) => item.id === itemId);
    if (idx === -1) {
      toast.warning('Item not found in cart');
      return;
    }
    if (quantity <= 0) {
      setCart(cart.filter((item: CartItem) => item.id !== itemId));
      toast.success('Item removed from cart');
      return;
    }
    cart[idx].quantity = quantity;
    setCart(cart);
    toast.success('Item quantity updated in cart');
  } catch {
    toast.error('Error updating item quantity in cart');
  }
}
export function getCartItemIds(): string[] {
  const cart = getCart();
  return cart ? cart.map(item => item.id) : [];
}



