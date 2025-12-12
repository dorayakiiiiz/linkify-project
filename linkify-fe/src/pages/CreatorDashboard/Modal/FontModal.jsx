import React from 'react';
import { FONTS } from '../../../constants/font';
// Danh sách font hiện có trong project (dựa trên index.css)

export default function FontPickerModal({ isOpen, onClose, onSelect, currentFont, title = "Select Font" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col max-h-[80vh] animate-fade-in-up">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <i className="fas fa-times text-gray-500 text-lg"></i>
                    </button>
                </div>

                {/* Font Grid List */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-3">
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
                                        relative group flex items-center justify-center py-4 px-2 rounded-xl border-2 transition-all duration-200
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
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                                            <i className="fas fa-bolt text-white text-[10px]"></i>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}