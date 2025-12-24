import { useState } from 'react';
import { HeaderDesign, ThemeDesign, Background, ButtonDesign, TextDesign, FooterDesign } from './DesignComponent/index.js'


// props từ DesignPage: isDesignPanelOpen, toggleDesignPanel
export default function DesignActions({ isDesignPanelOpen, toggleDesignPanel }) {
    // State để kiểm soát việc hiển thị HeaderDesign
    const [activeDesign, setActiveDesign] = useState("Header"); 
    // Hàm xử lý sự kiện click
    const handleHeaderClick = (i) => {
        // Luôn mở panel khi click vào một item
        setActiveDesign(i)
        toggleDesignPanel(true);
    };

    const handleClosePanel = () => {
        toggleDesignPanel(false); // Đảm bảo luôn tắt
    };

    //Tạo animation trượt lên cho các action
    const headerDesignClasses = `
        fixed bottom-0 left-0 w-full 
        h-1/3
        bg-white z-50 shadow-2xl 
        transition-transform duration-500 ease-in-out
        ${isDesignPanelOpen ? 'transform translate-y-0' : 'transform translate-y-full'}
    `;

    return (
        <>
            {/* Thanh công cụ hành động (Phần dưới) */}
            <div className="bg-white p-4 rounded-3xl shadow-xl w-full absolute bottom-0.5 left-1/2 transform -translate-x-1/2 md:hidden grid grid-cols-6 gap-2 ">

                {/* Header - Thêm sự kiện onClick */}
                <div className="flex flex-col items-center mx-4" onClick={() => handleHeaderClick('Header')}>
                    <i className="fas fa-user text-3xl text-gray-700 mb-1"></i>
                    <span className="text-sm font-medium text-gray-700">Header</span>
                </div>

                {/* Các mục khác giữ nguyên */}
                <div className="flex flex-col items-center mx-4" onClick={() => handleHeaderClick('Theme')}>
                    <i className="fas fa-th-large text-3xl text-gray-700 mb-1"></i>
                    <span className="text-sm font-medium text-gray-700">Theme</span>
                </div>
                <div className="flex flex-col items-center mx-4" onClick={() => handleHeaderClick('Background')}>
                    <i className="fas fa-border-style text-3xl text-gray-700 mb-1"></i>
                    <span className="text-sm font-medium text-gray-700">Background</span>
                </div>
                <div className="flex flex-col items-center mx-4" onClick={() => handleHeaderClick('Text')}>
                    <i className="fa-solid fa-font text-3xl text-gray-700 mb-1"></i>
                    <span className="text-sm font-medium text-gray-700">Text</span>
                </div>

                <div className="flex flex-col items-center mx-4" onClick={() => handleHeaderClick('Buttons')}>
                    <i className="fa-solid fa-bars-staggered text-3xl text-gray-700 mb-1"></i>
                    <span className="text-sm font-medium text-gray-700">Buttons</span>
                </div>

                <div className="flex flex-col items-center mx-4" onClick={() => handleHeaderClick('Footer & Donation')}>
                    <i className="fa-solid fa-window-maximize text-3xl text-gray-700 mb-1"></i>
                    <span className="text-sm font-medium text-gray-700">Footer & Donation</span>
                </div>                                             
            </div>


            {/* Component HeaderDesign với Hiệu ứng Trượt lên */}
            <div className={`${headerDesignClasses} overflow-y-auto`}>
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold">{activeDesign}</h2>
                    <button onClick={handleClosePanel} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                {/* Nội dung chính của HeaderDesign */}
                {activeDesign === 'Header' && <HeaderDesign />}
                {activeDesign === 'Theme' && <ThemeDesign />}
                {activeDesign === 'Background' && <Background />}
                {activeDesign === 'Text' && <TextDesign />}
                {activeDesign === 'Buttons' && <ButtonDesign />}
                {activeDesign === 'Footer & Donation' && <FooterDesign />}


            </div>
        </>
    );
}