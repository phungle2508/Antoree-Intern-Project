import { toast } from "react-toastify";
import { setCookie, dispatchCookieUpdate, getCookie, removeCookie } from "../lib/cookie";

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
