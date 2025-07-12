import { useEffect } from 'react';

let modalStackCount = 0; // Track how many modals are open

interface UseModalBehaviorProps {
    open: boolean;
    modalRef: React.RefObject<HTMLElement>;
    onClose: () => void;
}

export function useModalBehavior({ open, modalRef, onClose }: UseModalBehaviorProps) {
    useEffect(() => {
        if (!open) return;

        modalStackCount++;
        if (modalStackCount === 1) {
            // Only lock scroll on first modal open
            document.body.style.overflow = 'hidden';
        }

        const focusableSelector = `
      a[href], area[href], input:not([disabled]), select:not([disabled]),
      textarea:not([disabled]), button:not([disabled]),
      [tabindex]:not([tabindex="-1"])`;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();

            if (e.key === 'Tab' && modalRef.current) {
                const focusables = modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
                if (focusables.length === 0) return;

                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        const timer = setTimeout(() => {
            const focusables = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
            focusables?.[0]?.focus();
        }, 10);

        return () => {
            modalStackCount = Math.max(0, modalStackCount - 1);
            if (modalStackCount === 0) {
                // Only restore scroll if no modals left
                document.body.style.overflow = '';
            }

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
            clearTimeout(timer);
        };
    }, [open, modalRef, onClose]);
}
