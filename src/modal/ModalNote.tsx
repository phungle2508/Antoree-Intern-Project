import React, { useRef } from "react";

interface ModalNoteProps {
    open: boolean;
}

const ModalNote: React.FC<ModalNoteProps> = ({ open }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40"
            style={{ pointerEvents: "none" }}
        >
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 max-w-xs w-full border-2"
                style={{ borderColor: '#ffc680' }}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">Note</span>
                </div>
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">Em hiện đang sử dụng model sentence-transformers/all-MiniLM-L6-v2 nên chỉ có thể gợi ý sản phẩm model này không thể trò chuyện thông thường </div>
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">AI chỉ hiểu được những từ có sẵn ở file ai/course.json</div>
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">AI không hỗ trợ tiếng Việt</div>
                <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line">AI được sử dụng ở box chat và phần gợi ý ở Dashboard </div>
            </div>
        </div>
    );
};

export default ModalNote;
