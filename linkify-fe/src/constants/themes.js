import '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg';

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
                type: 'gradient',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#3469FC',       // Màu chính (hoặc màu bắt đầu gradient)
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
       
];