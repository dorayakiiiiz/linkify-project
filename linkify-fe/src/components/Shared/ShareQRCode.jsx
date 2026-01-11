import QRCode from 'react-qr-code';
import { useEffect, useState, useRef } from "react";

// Hàm chuyển đổi Hex sang RGB object
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function isDarkColor(colorString) {
    if (!colorString || colorString === 'rgba(0, 0, 0, 0)' || colorString === 'transparent') return false;

    let r, g, b;

    // Kiểm tra nếu là Hex
    if (colorString.startsWith('#')) {
        const rgb = hexToRgb(colorString);
        if (!rgb) return false;
        ({ r, g, b } = rgb);
    } 
    // Kiểm tra nếu là RGB/RGBA
    else {
        const match = colorString.match(/\d+/g);
        if (!match) return false;
        [r, g, b] = match.map(Number);
    }

    // Công thức tính độ sáng (Luminance)
    // Brightness = (R * 299 + G * 587 + B * 114) / 1000
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Ngưỡng 128: < 128 là tối, >= 128 là sáng
    return brightness < 128; 
}

export default function ShareQRCode({ parentBgColor }) {
    const url = window.location.href;
    const containerRef = useRef(null);
    const [fgColor, setFgColor] = useState("#000000");

    // lấy màu nền để chỉnh màu qr code cho thích hợp
    useEffect(() => {
        // Ưu tiên dùng prop truyền vào (từ PublicProfile), nếu không thì fallback lấy từ DOM
        let bgToCheck = parentBgColor;

        if (!bgToCheck && containerRef.current?.parentElement) {
            bgToCheck = window.getComputedStyle(containerRef.current.parentElement).backgroundColor;
        }

        if (bgToCheck) {
            if (isDarkColor(bgToCheck)) {
                setFgColor("#ffffff"); // Nền tối -> QR Trắng
            } else {
                setFgColor("#000000"); // Nền sáng -> QR Đen
            }
        }
    }, [parentBgColor]); // Chạy lại khi parentBgColor thay đổi


    return (
        <div 
            ref={containerRef}
            className="fixed bottom-10 right-10 hidden lg:flex flex-col items-center gap-2"
        >
            <div className="font-quicksand font-bold" style={{ color: fgColor }}>
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