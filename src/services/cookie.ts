// Helper functions for cookiesimpor 
import { toast } from 'react-toastify';

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1] || null;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface HistoryItem {
  id: string;
  quantity: number;
}

// Helper function to dispatch cookie update event
const dispatchCookieUpdate = () => {
  window.dispatchEvent(new CustomEvent('cookieUpdate'));
};

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
// Wishlist
export function setWishlist(wishlist: string[]) {
  setCookie('wishlist', JSON.stringify(wishlist));
  dispatchCookieUpdate();
}
export function getWishlist(): string[] | null {
  const val = getCookie('wishlist');
  return val ? JSON.parse(decodeURIComponent(val)) : null;
}
export function removeWishlist() {
  removeCookie('wishlist');
}
export function appendWishlist(item: string): void {
  try {
    const wishlist = getWishlist() || [];
    if (wishlist.includes(item)) {
      toast.info('Item already exists in wishlist');
      return;
    }
    wishlist.push(item);
    setWishlist(wishlist);
    toast.success('Item added to wishlist');
  } catch {
    toast.error('Error appending item to wishlist');
  }
}
export function removeWishlistItem(item: string): void {
  try {
    const wishlist = getWishlist() || [];
    if (!wishlist.includes(item)) {
      toast.warning('Item not found in wishlist');
      return;
    }
    const updated = wishlist.filter(i => i !== item);
    setWishlist(updated);
    toast.success('Item removed from wishlist');
  } catch {
    toast.error('Error removing item from wishlist');
  }
}

export interface CookieService {
  setCart: (cart: string[]) => void;
  getCart: () => string[] | null;
  removeCart: () => void;
  appendCart: (item: string) => void;
  removeCartItem: (item: string) => void;

  setWishlist: (wishlist: string[]) => void;
  getWishlist: () => string[] | null;
  removeWishlist: () => void;
  appendWishlist: (item: string) => void;
  removeWishlistItem: (item: string) => void;

  setHistory: (history: string[]) => void;
  getHistory: () => string[] | null;
  removeHistory: () => void;
  appendHistory: (item: string) => void;
  removeHistoryItem: (item: string) => void;
}

