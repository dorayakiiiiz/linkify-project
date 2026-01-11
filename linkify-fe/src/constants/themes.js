

export const THEMES = [

    {
        id: 'theme1',
        name: 'Quiet',
        design: {
            themeId: 'theme1',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '/theme_1.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#fff',       // Màu chữ
                font: 'Inter',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'small',  // Kích thước tên: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#fff',       // Màu nền nút
                textColor: '#000',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'subtle'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#fff',
                font: 'Inter',
                size: 'small'           // 'small', 'large'
            },

            // 5. Nút donation (nếu có)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'glass',
                color: '#575657',
                textColor: '#51DDF1',
                icon: 'fa-solid fa-heart',
                size: 'medium'
            },

            // 6. Footer (nếu có)
            footer: {
                backgroundColor: '#ffffff',
                textColor: '#2563eb',
            }
        }
    },
    {
        id: 'theme2',
        name: 'Sky',
        design: {
            themeId: 'theme2',
            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#3469FC',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '/theme_2.jpg',
                toColor: '#95DBFF',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#fff',       // Màu chữ
                font: 'Montserrat',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'small',  // Kích thước tên: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'solid',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#fff',       // Màu nền nút
                textColor: '#001766',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'subtle'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#fff',
                font: 'Quicksand',
                size: 'small'           // 'small', 'large'
            },

            // 5. Nút donation (nếu có)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'glass',
                color: '#294D4D',
                textColor: '#F99BFF',
                icon: 'fa-solid fa-star',
                size: 'medium'
            },

            // 6. Footer (nếu có)
            footer: {
                backgroundColor: '#ffffff',
                textColor: '#2563eb',
            }
        }
    },

    {
        id: 'theme3',
        name: 'Cozy',
        design: {
            themeId: 'theme3',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '/theme_3.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#fff',       // Màu chữ
                font: 'Quicksand',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'small',  // Kích thước tên: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#CCCCC3',       // Màu nền nút
                textColor: '#FFF42F',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'subtle'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#fff',
                font: 'Nunito',
                size: 'small'           // 'small', 'large'
            },

            // 5. Nút donation (nếu có)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#FDFFEB',
                textColor: '#FF7544',
                icon: 'fa-solid fa-coffee',
                size: 'medium'
            },

            // 6. Footer (nếu có)
            footer: {
                backgroundColor: '#ffffff',
                textColor: '#2563eb',
            }
        }
    },

    {
        id: 'theme4',
        name: 'Ocean',
        design: {
            themeId: 'theme4',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#001a4d',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '/theme_4.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#0066cc',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#fff',       // Màu chữ
                font: 'Inter',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'small',  // Kích thước tên: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#00CCFF',       // Màu nền nút
                textColor: '#001a4d',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'subtle'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#fff',
                font: 'Inter',
                size: 'small'           // 'small', 'large'
            },

            // 5. Nút donation (nếu có)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'glass',
                color: '#0066cc',
                textColor: '#00FFFF',
                icon: 'fa-solid fa-water',
                size: 'medium'
            },

            // 6. Footer (nếu có)
            footer: {
                backgroundColor: '#ffffff',
                textColor: '#001a4d',
            }
        }
    },

        {
        id: 'theme5',
        name: 'Cosmic',
        design: {
            themeId: 'theme5',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#0a0e27',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '/theme_5.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#1a1a2e',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#e0f7ff',       // Màu chữ
                font: 'Inter',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'small',  // Kích thước tên: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#0f3a4d',       // Màu nền nút
                textColor: '#00ffff',   // Màu chữ trong nút
                shadowColor: '#00ccff', // Màu bóng đổ
                shadowStyle: 'strong'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#e0f7ff',
                font: 'Inter',
                size: 'small'           // 'small', 'large'
            },

            // 5. Nút donation (nếu có)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'glass',
                color: '#001f3f',
                textColor: '#00ffff',
                icon: 'fa-solid fa-star',
                size: 'medium'
            },

            // 6. Footer (nếu có)
            footer: {
                backgroundColor: '#0a0e27',
                textColor: '#00ffff',
            }
        }
    },

{
        id: 'theme6',
        name: 'Cascade',
        design: {
            themeId: 'theme6',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',
                value: '#102018',
                imageUrl: '/theme_6.jpg',
                toColor: '#6AA77A',
                direction: 'to bottom'
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#FFFFFF',        
                font: 'Quicksand',
                sizeUsername: 'small',
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: '#E8F5F0',       
                textColor: '#000000',   // changed to black
                shadowColor: '#000000',
                shadowStyle: 'subtle'
            },

            // 4. Cấu hình Text chung
            text: {
                color: '#FFFFFF',        
                font: 'Quicksand',
                size: 'small'
            },

            // 5. Nút donation
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'glass',
                color: '#D4EDE8',       
                textColor: '#000000',   // changed to black
                icon: 'fa-solid fa-water',
                size: 'medium'
            },

            // 6. Footer
            footer: {
                backgroundColor: '#ffffff',
                textColor: '#102018',      
            }
        }
    },

    {
        id: 'theme7',
        name: 'Patriot',
        design: {
            themeId: 'theme7',

            background: {
                type: 'image',
                value: '#FFF5F5',
                imageUrl: '/theme_7.jpg',
                toColor: '#FFE4E4',
                direction: 'to bottom'
            },

            header: {
                color: '#C41E3A',
                font: 'Inter',
                sizeUsername: 'small'
            },

            buttons: {
                shape: 'medium',
                style: 'solid',
                color: '#C41E3A',       // red background
                textColor: '#000000',   // changed to black
                shadowColor: 'rgba(0, 0, 0, 0.15)',
                shadowStyle: 'subtle'
            },

            text: {
                color: '#000000',       // changed to black
                font: 'Inter',
                size: 'small'
            },

            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#C41E3A',      
                textColor: '#000000',   // changed to black
                icon: 'fa-solid fa-star',
                size: 'medium'
            },

            footer: {
                backgroundColor: '#C41E3A',
                textColor: '#FFFFFF'
            }
        }
    },

    {
        id: 'theme8',
        name: 'Ember Serpent',
        design: {
            themeId: 'theme8',

            // Background (image with warm-dark base)
            background: {
                type: 'image',
                value: '#0b0a0b',
                imageUrl: '/theme_8.jpg',
                toColor: '#24140c',
                direction: 'to bottom'
            },

            // Header (set to white as requested)
            header: {
                color: '#FFFFFF',            // changed to white
                font: 'Inter',
                sizeUsername: 'small',
                textShadow: '0 2px 6px rgba(0,0,0,0.6)'
            },

            // Buttons (semi-opaque dark surface + warm gold text)
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(18,16,14,0.64)', // muted dark frosted panel
                textColor: '#FFD57A',         // soft gold - stands out without clashing
                borderColor: 'rgba(255,213,122,0.12)',
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowStyle: 'subtle'
            },

            // General text (notes) set to white
            text: {
                color: '#FFFFFF',            // changed to white
                font: 'Inter',
                size: 'small',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)'
            },

            // Donation button (accent with deep emerald to echo serpent)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#153B2E',    // deep emerald accent
                textColor: '#FFD57A',// same warm gold
                icon: 'fa-solid fa-gem',
                size: 'medium'
            },

            // Footer (dark translucent with cream text)
            footer: {
                backgroundColor: 'rgba(12,10,10,0.6)',
                textColor: '#F6E3C4'
            }
        }
    },

    {
        id: 'theme9',
        name: 'Rainwalk',
        design: {
            themeId: 'theme9',

            // Background
            background: {
                type: 'image',
                value: '#0e1a20',
                imageUrl: '/theme_9.jpg',
                toColor: '#0b2a35',
                direction: 'to bottom'
            },

            // Header (title)
            header: {
                color: '#FFFFFF',                 // white title for contrast on moody photo
                font: 'Inter',
                sizeUsername: 'small',
                textShadow: '0 2px 6px rgba(0,0,0,0.7)'
            },

            // Buttons (muted translucent surface + warm accent text)
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(6,10,12,0.48)',      // dark frosted panel so buttons don't blow out photo
                textColor: '#FFD39B',             // soft warm amber for readable but gentle contrast
                borderColor: 'rgba(255,211,155,0.12)',
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowStyle: 'subtle'
            },

            // General text / notes
            text: {
                color: '#FFFFFF',                 // white notes for legibility on dark areas
                font: 'Inter',
                size: 'small',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)'
            },

            // Donation button (accent CTA)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#FFC371',                 // warmer solid CTA
                textColor: '#081019',
                icon: 'fa-solid fa-heart',
                size: 'medium'
            },

            // Footer
            footer: {
                backgroundColor: 'rgba(6,10,12,0.6)',
                textColor: '#FFFFFF'
            }
        }
    },

        {
        id: 'theme10',
        name: 'Twilight',
        design: {
            themeId: 'theme10',

            // Background (sunset + starry sky)
            background: {
                type: 'image',
                value: '#0b1220',
                imageUrl: '/theme_10.jpg',
                toColor: '#FF9F4A',
                direction: 'to bottom'
            },

            // Header (soft warm cream, subtle shadow)
            header: {
                color: '#FFF8E7',
                font: 'Inter',
                sizeUsername: 'small',
                textShadow: '0 2px 6px rgba(0,0,0,0.6)'
            },

            // Buttons (muted dark frosted panel + warm amber text)
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(6,10,20,0.56)',
                textColor: '#FFD39B',
                borderColor: 'rgba(255,211,155,0.12)',
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowStyle: 'subtle'
            },

            // General text / notes (light warm tone for readability)
            text: {
                color: '#FFEFD6',
                font: 'Inter',
                size: 'small',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)'
            },

            // Donation button (warm solid CTA echoing sunset)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#FF8C42',
                textColor: '#081019',
                icon: 'fa-solid fa-meteor',
                size: 'medium'
            },

            // Footer (dark translucent)
            footer: {
                backgroundColor: 'rgba(6,10,20,0.6)',
                textColor: '#FFEFD6'
            }
        }
    },

    {
        id: 'theme11',
        name: 'Seabreeze',
        design: {
            themeId: 'theme11',

            // 1. Background
            background: {
                type: 'image',
                value: '#E6F9FF',
                imageUrl: '/theme_11.jpg',
                toColor: '#A7E7FF',
                direction: 'to bottom'
            },

            // 2. Header (title)
            header: {
                color: '#023E8A',          // deep navy for strong contrast on bright sky
                font: 'Inter',
                sizeUsername: 'small',
                textShadow: '0 1px 2px rgba(255,255,255,0.6)'
            },

            // 3. Buttons
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(255,255,255,0.92)', // opaque soft white (frosted)
                textColor: '#0077B6',            // clean blue for legibility
                borderColor: 'rgba(0,119,182,0.08)',
                shadowColor: 'rgba(2,46,87,0.12)',
                shadowStyle: 'subtle'
            },

            // 4. General text / notes
            text: {
                color: '#023E8A',          // navy for body text
                font: 'Inter',
                size: 'small',
                textShadow: 'none'
            },

            // 5. Donation button (accent)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#00B4D8',          // sea cyan accent
                textColor: '#FFFFFF',
                icon: 'fa-solid fa-water',
                size: 'medium'
            },

            // 6. Footer
            footer: {
                backgroundColor: 'rgba(255,255,255,0.9)',
                textColor: '#023E8A'
            }
        }
    },

    {
        id: 'theme12',
        name: 'Stormstrike',
        design: {
            themeId: 'theme12',

            // Background
            background: {
                type: 'image',
                value: '#070116',
                imageUrl: '/theme_12.jpg',
                toColor: '#2b0057',
                direction: 'to bottom'
            },

            // Header (title)
            header: {
                color: '#FFFFFF',                          // trắng cho tương phản với nền tối
                font: 'Inter',
                sizeUsername: 'small',
                textShadow: '0 2px 8px rgba(0,0,0,0.75)'
            },

            // Buttons (frosted dark + accent sáng của tia sét)
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(255,255,255,0.08)',           // panel nhẹ, không che nền
                textColor: '#BFF8FF',                      // xanh nhạt ánh điện nhẹ
                borderColor: 'rgba(191,248,255,0.12)',
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowStyle: 'subtle'
            },

            // General text / notes
            text: {
                color: '#E8FBFF',                          // chữ sáng mềm, dễ đọc
                font: 'Inter',
                size: 'small',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)'
            },

            // Donation button (accent CTA)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#6BE7FF',                          // accent điện
                textColor: '#031023',                      // chữ tối trên nút sáng
                icon: 'fa-solid fa-bolt',
                size: 'medium'
            },

            // Footer
            footer: {
                backgroundColor: 'rgba(4,4,6,0.6)',
                textColor: '#E8FBFF'
            }
        }
    },

    {
        id: 'theme13',
        name: 'Lotus Glow',
        design: {
            themeId: 'theme13',

            // Background
            background: {
                type: 'image',
                value: '#F3FDFF',
                imageUrl: '/theme_13.jpg',
                toColor: '#D8F2FF',
                direction: 'to bottom'
            },

            // Header (title)
            header: {
                color: '#0B3D91',            
                font: 'Inter',
                sizeUsername: 'small',
                textShadow: '0 1px 2px rgba(255,255,255,0.6)'
            },

            // Buttons 
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(255,255,255,0.92)', // opaque soft white
                textColor: '#0B3D91',            // navy to match header
                borderColor: 'rgba(11,61,145,0.08)',
                shadowColor: 'rgba(11,61,145,0.08)',
                shadowStyle: 'subtle'
            },

            // General text / notes
            text: {
                color: '#0B3D91',              // navy body text
                font: 'Inter',
                size: 'small',
                textShadow: 'none'
            },

            // Donation button (gentle pink accent)
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#FFC6D1',             // soft lotus pink
                textColor: '#081019',         // dark text for legibility
                icon: 'fa-solid fa-seedling',
                size: 'medium'
            },

            // Footer
            footer: {
                backgroundColor: 'rgba(255,255,255,0.95)',
                textColor: '#0B3D91'
            }
        }
    },

    {
        id: 'theme14',
        name: 'Sunlight',
        design: {
            themeId: 'theme14',

            // 1. Cấu hình Nền
            background: {
                type: 'image',
                value: '#2D1B10', // Màu nâu sẫm của gỗ
                imageUrl: '/theme_14.jpg',
                toColor: '#4A3728',
                direction: 'to bottom'
            },

            // 2. Header
            header: {
                color: '#FFFBEB', 
                font: 'Quicksand', 
                sizeUsername: 'small',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            },

            // 3. Cấu hình Nút
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(45, 26, 12, 0.7)', 
                textColor: '#FDE68A',          
                borderColor: 'rgba(253, 230, 138, 0.2)',
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowStyle: 'subtle'
            },

            // 4. Text chung
            text: {
                color: '#FFFBEB',
                font: 'Quicksand',
                size: 'small',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            },

            // 5. Nút donation
        
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',
                color: '#B45309',      
                textColor: '#FFFFFF',
                icon: 'fa-solid fa-sun',
                size: 'medium'
            },

            // 6. Footer
            footer: {
                backgroundColor: 'rgba(28, 18, 10, 0.8)',
                textColor: '#FDE68A'
            }
        }
    },

        {
        "id": "theme15",
        "name": "Mountain Road",
        "design": {
            "themeId": "theme15",

            // 1. Cấu hình Nền 
            "background": {
                "type": "image",
                "value": "#1B2A49",      // Màu xanh dương đậm từ bầu trời đêm
                "imageUrl": "/theme_15.jpg",
                "toColor": "#2D5F2E",     // Màu xanh lá đậm từ cây cối
                "direction": "to bottom"
            },

            // 2. Cấu hình Header
            "header": {
                "color": "#F0F8FF",       // Màu trắng kem sáng để nổi bật
                "font": "Montserrat",
                "sizeUsername": "small",
                "textShadow": "0 2px 4px rgba(0,0,0,0.5)"
            },

            // 3. Cấu hình Nút (Buttons)
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(27, 42, 73, 0.7)", // Màu xanh dương đậm trong suốt
                "textColor": "#F0F8FF",           // Chữ trắng kem
                "borderColor": "rgba(240, 248, 255, 0.2)",
                "shadowColor": "rgba(0,0,0,0.3)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#F0F8FF",
                "font": "Montserrat",
                "size": "small",
                "textShadow": "0 1px 2px rgba(0,0,0,0.5)"
            },

            // 5. Nút donation 
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#2D5F2E",       // Xanh lá đậm
                "textColor": "#F0F8FF",
                "icon": "fa-solid fa-car", // Icon xe hơi 
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(27, 42, 73, 0.9)", 
                "textColor": "#F0F8FF"
            }
        }
    },


    {
        id: 'theme16',
        name: 'Cat in Tree',
        design: {
            themeId: 'theme16',

            // 1. Cấu hình Nền
            
            background: {
                type: 'image',
                value: '#1E3F20',       // Màu xanh rêu đậm
                imageUrl: '/theme_16.jpg', 
                toColor: '#2F4F2F',     // Gradient nhẹ sang màu xanh rêu sáng hơn
                direction: 'to bottom'
            },

            // 2. Header (Username & Bio)
           
            header: {
                color: '#F0F8E7',       // Trắng kem ánh xanh nhẹ
                font: 'Quicksand',      // Font chữ tròn trịa, thân thiện
                sizeUsername: 'small',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)' // Bóng nhẹ để tăng độ rõ
            },

            // 3. Cấu hình Nút (Buttons)
            
            
            buttons: {
                shape: 'medium',
                style: 'glass',
                color: 'rgba(74, 119, 74, 0.5)', 
                textColor: '#FFFFFF',            
                borderColor: 'rgba(143, 188, 143, 0.3)', 
                shadowColor: 'rgba(30, 50, 30, 0.3)',
                shadowStyle: 'subtle'
            },

            // 4. Cấu hình Text chung
            text: {
                color: '#F0F8E7',       
                font: 'Quicksand',
                size: 'small',
                textShadow: 'none'
            },

            // 5. Nút donation (Nổi bật)
            
            
            donationButton: {
                useGlobal: false,
                shape: 'medium',
                style: 'solid',          
                color: '#D4A017',        
                textColor: '#1E3F20',    
                icon: 'fa-solid fa-cat', 
                size: 'medium'
            },

            // 6. Footer
            
            footer: {
                backgroundColor: 'rgba(30, 63, 32, 0.8)', 
                textColor: '#F0F8E7'     
            }
        }
    },


    {
        "id": "theme17",
        "name": "Moonlit Cove",
        "design": {
            "themeId": "theme17",

            // 1. Cấu hình Nền (Background)
            
            "background": {
                "type": "image",
                "value": "#0A192F",      // Màu xanh dương đậm (Deep Blue/Midnight)
                "imageUrl": "/theme_17.jpg", 
                "toColor": "#1E3F5A",     // Gradient nhẹ sang xanh navy
                "direction": "to bottom"
            },

            // 2. Cấu hình Header (Username & Bio)
            
            "header": {
                "color": "#E6F1FF",       // Trắng ánh xanh nhạt (Light Blueish White)
                "font": "Montserrat",     // Font chữ hiện đại, thanh lịch
                "sizeUsername": "small",
                "textShadow": "0 2px 4px rgba(0,0,0,0.6)" // Bóng đổ nhẹ giúp chữ tách biệt khỏi nền
            },

            // 3. Cấu hình Nút (Buttons)
            
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(10, 25, 47, 0.6)", // Màu nền tối trong suốt
                "textColor": "#B0D7FF",           // Chữ màu xanh dương nhạt (Light Sky Blue)
                "borderColor": "rgba(176, 215, 255, 0.2)", // Viền sáng nhẹ
                "shadowColor": "rgba(0,0,0,0.4)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            
            "text": {
                "color": "#E6F1FF",
                "font": "Montserrat",
                "size": "small",
                "textShadow": "0 1px 2px rgba(0,0,0,0.5)"
            },

            // 5. Nút donation (Nổi bật)
            
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",         
                "color": "#00B4D8",        
                "textColor": "#0A192F",    
                "icon": "fa-solid fa-moon", // Icon mặt trăng phù hợp chủ đề
                "size": "medium"
            },

            // 6. Footer
            
            "footer": {
                "backgroundColor": "rgba(10, 25, 47, 0.85)", // Màu nền tối đậm, bán trong suốt
                "textColor": "#B0D7FF"     // Chữ màu xanh dương nhạt
            }
        }
    },

    {
        "id": "theme18",
        "name": "Forest Express",
        "design": {
            "themeId": "theme18",

            // 1. Cấu hình Nền (Background)
            // Sử dụng màu xanh lá xám (Sage Green) làm nền chờ để hòa hợp với màu rừng.
            "background": {
                "type": "image",
                "value": "#2F3E33",      // Màu xanh lá đậm trung tính
                "imageUrl": "/theme_18.jpg",
                "toColor": "#4A5D4E",     // Gradient sang tông xám xanh
                "direction": "to bottom"
            },

            // 2. Cấu hình Header (Username & Bio)
            // Màu trắng xám nhạt gợi cảm giác sạch sẽ và hiện đại.
            "header": {
                "color": "#F2F2F2",       
                "font": "Inter",          // Font chữ tối giản, hiện đại
                "sizeUsername": "small",
                "textShadow": "0 2px 4px rgba(0,0,0,0.4)"
            },

            // 3. Cấu hình Nút (Buttons)
            // Kiểu "glass" (kính) cực kỳ phù hợp với bối cảnh cửa sổ tàu.
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(47, 62, 51, 0.6)", // Màu xanh rừng trầm trong suốt
                "textColor": "#F2F2F2",           
                "borderColor": "rgba(255, 255, 255, 0.15)",
                "shadowColor": "rgba(0,0,0,0.2)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#D1D9D2",       // Màu xám xanh nhạt cho các văn bản phụ
                "font": "Inter",
                "size": "small",
                "textShadow": "none"
            },

            // 5. Nút donation (Nổi bật)
            // Sử dụng màu vàng cát (Sunlight Gold) lấy từ vệt nắng chiếu trên khung cửa.
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#E3C18D",       // Màu vàng nắng nhạt
                "textColor": "#1B261F",    // Chữ màu tối để tương phản
                "icon": "fa-solid fa-train", // Icon tàu hỏa phù hợp bối cảnh
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(27, 38, 31, 0.9)", // Màu tối hẳn để kết thúc trang
                "textColor": "#B0BDB3"
            }
        }
    },

    {
        "id": "theme19",
        "name": "Midnight Florist",
        "design": {
            "themeId": "theme19",

            // 1. Cấu hình Nền (Background)
            
            "background": {
                "type": "image",
                "value": "#0D0F14",      // Màu đen xanh đậm (Midnight Ink)
                "imageUrl": "/theme_19.jpg",
                "toColor": "#1A1412",     // Gradient nhẹ sang màu nâu gỗ tối
                "direction": "to bottom"
            },

            // 2. Cấu hình Header (Username & Bio)
            
            "header": {
                "color": "#F5E6D3",       
                "font": "Playfair Display", // Font chữ có chân (Serif) tạo vẻ cổ điển, nghệ thuật
                "sizeUsername": "small",
                "textShadow": "0 2px 5px rgba(0,0,0,0.8)"
            },

            // 3. Cấu hình Nút (Buttons)
            
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(26, 20, 18, 0.7)", // Màu nâu tối bán trong suốt
                "textColor": "#F5E6D3",           
                "borderColor": "rgba(245, 230, 211, 0.15)",
                "shadowColor": "rgba(0,0,0,0.4)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#DBC7B5",       // Màu be nhạt
                "font": "Playfair Display",
                "size": "small",
                "textShadow": "none"
            },

            // 5. Nút donation (Nổi bật)
            
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#B87373",       // Màu hồng đất/đỏ gạch nhạt
                "textColor": "#FFF5E1",    
                "icon": "fa-solid fa-seedling", // Icon mầm cây/hoa phù hợp chủ đề
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(13, 15, 20, 0.9)",
                "textColor": "#8C7E6F"
            }
        }
    },




    {
        "id": "theme20",
        "name": "Autumn Escape",
        "design": {
            "themeId": "theme20",

            // 1. Cấu hình Nền (Background)
            
            "background": {
                "type": "image",
                "value": "#C5C2B7",      // Màu be xám (Warm Grey)
                "imageUrl": "/theme_20.jpg",
                "toColor": "#8B8C7A",     // Gradient sang màu xanh rêu nhạt
                "direction": "to bottom"
            },

            // 2. Cấu hình Header 
           
            "header": {
                "color": "#2C2C2C",       
                "font": "EB Garamond",    // Font chữ cổ điển, thanh mảnh phù hợp phong cách tranh vẽ
                "sizeUsername": "small",
                "textShadow": "none"
            },

            // 3. Cấu hình Nút (Buttons)
            
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(107, 114, 90, 0.4)", // Màu xanh rêu nhạt trong suốt
                "textColor": "#2C2C2C",           
                "borderColor": "rgba(44, 44, 44, 0.2)",
                "shadowColor": "rgba(0,0,0,0.1)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#4A4A4A",       // Màu xám đậm cho nội dung phụ
                "font": "EB Garamond",
                "size": "small",
                "textShadow": "none"
            },

            // 5. Nút donation (Nổi bật)
            
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#A66D4F",       // Màu cam đất trầm
                "textColor": "#FFFFFF",    
                "icon": "fa-solid fa-person-running", // Icon phù hợp với hành động trong ảnh
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(139, 140, 122, 0.8)",
                "textColor": "#F2F2F2"
            }
        }
    },

    {
        "id": "theme21",
        "name": "Deep Sea Light",
        "design": {
            "themeId": "theme21",

            // 1. Cấu hình Nền (Background)
            
            "background": {
                "type": "image",
                "value": "#023047",      // Xanh đại dương đậm
                "imageUrl": "/theme_21.jpg",
                "toColor": "#219EBC",     // Gradient sang màu xanh lơ của nước nông
                "direction": "to bottom"
            },

            // 2. Cấu hình Header (Username & Bio)
            
            "header": {
                "color": "#E0FBFC",       
                "font": "Quicksand",      // Font chữ tròn trịa, tạo cảm giác mềm mại như dòng nước
                "sizeUsername": "small",
                "textShadow": "0 2px 8px rgba(0,0,0,0.5)"
            },

            // 3. Cấu hình Nút (Buttons)
            
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(2, 48, 71, 0.5)", // Màu xanh sẫm bán trong suốt
                "textColor": "#E0FBFC",           
                "borderColor": "rgba(142, 236, 245, 0.3)", // Viền màu xanh nước biển nhạt
                "shadowColor": "rgba(0,0,0,0.2)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#BDE0FE",       // Màu xanh da trời rất nhạt
                "font": "Quicksand",
                "size": "small",
                "textShadow": "none"
            },

            // 5. Nút donation (Nổi bật)
           
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#8ECAE6",       // Màu xanh ngọc sáng
                "textColor": "#023047",    // Chữ xanh đậm để tương phản tốt
                "icon": "fa-solid fa-fish", // Icon chú cá phù hợp với đại dương
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(2, 48, 71, 0.85)",
                "textColor": "#8ECAE6"
            }
        }
    },

    {
        "id": "theme22",
        "name": "Daisy Kitchen",
        "design": {
            "themeId": "theme22",

            // 1. Cấu hình Nền (Background)
           
            "background": {
                "type": "image",
                "value": "#2D241E",      // Nâu gỗ đậm
                "imageUrl": "/theme_22.jpg",
                "toColor": "#5C4B3D",     // Gradient sang tông nâu sáng hơn
                "direction": "to bottom"
            },

            // 2. Cấu hình Header (Username & Bio)
            
            "header": {
                "color": "#FFFDF5",       
                "font": "Lora",           // Font chữ có chân thanh lịch, mang hơi hướng hoài cổ
                "sizeUsername": "small",
                "textShadow": "0 2px 4px rgba(0,0,0,0.6)"
            },

            // 3. Cấu hình Nút (Buttons)
            
            "buttons": {
                "shape": "medium",
                "style": "solid",
                "color": "rgba(45, 36, 30, 0.8)", // Nâu gỗ trầm bán trong suốt
                "textColor": "#FFFDF5",           
                "borderColor": "rgba(255, 253, 245, 0.1)",
                "shadowColor": "rgba(0,0,0,0.3)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#E5DACE",       // Màu be nhạt
                "font": "Lora",
                "size": "small",
                "textShadow": "none"
            },

            // 5. Nút donation (Nổi bật nhất)
            
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#D9A036",       // Vàng mật ong/vàng nghệ
                "textColor": "#2D241E",    
                "icon": "fa-solid fa-sun", // Icon mặt trời tượng trưng cho ánh nắng trong ảnh
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(26, 20, 17, 0.9)",
                "textColor": "#FFFDF5"
            }
        }
    },


    {
        "id": "theme23",
        "name": "Van Gogh Gallery",
        "design": {
            "themeId": "theme23",

            // 1. Cấu hình Nền (Background)
            
            "background": {
                "type": "image",
                "value": "#0A0A0A",      // Màu đen gần như tuyệt đối
                "imageUrl": "/theme_23.jpg",
                "toColor": "#1A1A1A",     // Gradient nhẹ sang xám than
                "direction": "to bottom"
            },

            // 2. Cấu hình Header (Username & Bio)
            
            "header": {
                "color": "#F2C94C",       
                "font": "Playfair Display", // Font chữ Serif sang trọng, phù hợp không gian nghệ thuật
                "sizeUsername": "small",
                "textShadow": "0 2px 10px rgba(242, 201, 76, 0.3)" // Hiệu ứng tỏa sáng nhẹ như ánh đèn spotlight
            },

            // 3. Cấu hình Nút (Buttons)
            
            "buttons": {
                "shape": "medium",
                "style": "glass",
                "color": "rgba(30, 30, 30, 0.7)", // Màu xám tối trong suốt
                "textColor": "#E0E0E0",           
                "borderColor": "rgba(242, 201, 76, 0.2)", // Viền vàng rất mảnh
                "shadowColor": "rgba(0,0,0,0.5)",
                "shadowStyle": "subtle"
            },

            // 4. Cấu hình Text chung
            "text": {
                "color": "#BDBDBD",       // Màu xám nhạt để không làm xao nhãng khỏi tiêu đề
                "font": "Playfair Display",
                "size": "small",
                "textShadow": "none"
            },

            // 5. Nút donation (Nổi bật)
            
            "donationButton": {
                "useGlobal": false,
                "shape": "medium",
                "style": "solid",
                "color": "#2D5A82",       // Màu xanh đêm (Starry Night Blue)
                "textColor": "#F2C94C",    
                "icon": "fa-solid fa-palette", // Icon bảng màu họa sĩ
                "size": "medium"
            },

            // 6. Footer
            "footer": {
                "backgroundColor": "rgba(0, 0, 0, 0.9)",
                "textColor": "#4F4F4F"
            }
        }
    }
];