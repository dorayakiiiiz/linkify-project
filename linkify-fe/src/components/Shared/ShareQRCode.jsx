import QRCode from 'react-qr-code';
import { useEffect, useState, useRef } from "react";

function isDarkColor(rgbString) {
    // Nếu không lấy được màu hoặc màu trong suốt, mặc định coi là nền sáng
    if (!rgbString || rgbString === 'rgba(0, 0, 0, 0)' || rgbString === 'transparent') return false;

    const match = rgbString.match(/\d+/g);
    if (!match) return false;

    const [r, g, b] = match.map(Number);
    // Công thức tính độ sáng
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128; // < 128 là tối
}

export default function ShareQRCode() {
    const url = window.location.href;
    const containerRef = useRef(null);
    const [fgColor, setFgColor] = useState("#000000");
    let bgColor = '#ccc';

    // lấy màu nền để chỉnh màu qr code cho thích hợp
    useEffect(() => {
        if (!containerRef.current) return;

        const parentElement = containerRef.current.parentElement;
        
        if (parentElement) {
            const bg = window.getComputedStyle(parentElement).backgroundColor;

            if (isDarkColor(bg)) {
                setFgColor("#fff"); // Nền tối -> QR Trắng
            } else {
                setFgColor("#000"); // Nền sáng -> QR Đen
            }
        }
    }, []);


    return (
        <div 
            ref={containerRef}
            className="fixed bottom-10 right-10 hidden lg:flex flex-col items-center gap-2"
        >
            <div className={`font-quicksand font-bold text-[${fgColor}]`}>
                View on mobile
            </div>
            <div className="relative">
                <QRCode
                    size={110}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={url}
                    viewBox={`0 0 256 256`}
                    fgColor={fgColor}
                    bgColor="transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-green-600">
                        <i className="fa-brands fa-linktree"></i>  
                    </div>
                </div>

            </div>
        </div>
    )
}