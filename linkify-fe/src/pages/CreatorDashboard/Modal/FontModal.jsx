import React from 'react';
import { createPortal } from 'react-dom';
import { FONTS } from '../../../constants/font';
// Danh sách font hiện có trong project (dựa trên index.css)

export default function FontPickerModal({ isOpen, onClose, onSelect, currentFont, title = "Select Font" }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-md rounded-2xl md:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] md:max-h-[80vh] animate-fade-in-up">
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <i className="fas fa-times text-gray-500 text-lg"></i>
                    </button>
                </div>

                {/* Font Grid List */}
                <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {FONTS.map((font) => {
                            const isSelected = currentFont === font.name;
                            
                            return (
                                <button
                                    key={font.name}
                                    onClick={() => {
                                        onSelect(font.name);
                                        onClose();
                                    }}
                                    className={`
                                        relative group flex items-center justify-center py-3 md:py-4 px-2 rounded-xl border-2 transition-all duration-200
                                        ${isSelected 
                                            ? 'border-black bg-gray-100' 
                                            : 'border-transparent bg-[#EBEBEB] hover:bg-[#E0E0E0]'
                                        }
                                    `}
                                >
                                    {/* Font Name Preview */}
                                    <span className={`text-gray-800 text-sm md:text-base ${font.class}`}>
                                        {font.name}
                                    </span>

                                    {/* Pro Badge (Icon sét) */}
                                    {font.isPro && (
                                        <div className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-5 md:h-5 bg-gray-400 rounded-full flex items-center justify-center">
                                            <i className="fas fa-bolt text-white text-[8px] md:text-[10px]"></i>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}