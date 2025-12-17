import '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg';

export const THEMES = [

    {
        id: 'custom',
        name: 'Custom',
        type: 'image', // Hiển thị icon bảng màu thay vì ảnh preview
        previewImage: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg', 
        design: {
            themeId: 'custom',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#1F2937',       // Màu chữ
                font: 'Inter',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'large',  // Kích thước tên: 'small', 'large'
                sizeBio: 'small',       // Kích thước bio: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'medium',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'solid',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#000000',       // Màu nền nút
                textColor: '#ffffff',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'none'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#1F2937',
                font: 'Inter',
                size: 'small'           // 'small', 'large'
            }
        }
    },

    {
        id: 'custom',
        name: 'Custom',
        type: 'image', // Hiển thị icon bảng màu thay vì ảnh preview
        previewImage: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg', 
        design: {
            themeId: 'custom',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#1F2937',       // Màu chữ
                font: 'Mono',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'large',  // Kích thước tên: 'small', 'large'
                sizeBio: 'small',       // Kích thước bio: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'round',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#123864',       // Màu nền nút
                textColor: '#ffffff',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'none'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#111125',
                font: 'Momo',
                size: 'large'           // 'small', 'large'
            }
        }
    },  

        {
        id: 'custom',
        name: 'Custom',
        type: 'image', // Hiển thị icon bảng màu thay vì ảnh preview
        previewImage: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg', 
        design: {
            themeId: 'custom',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#1F2937',       // Màu chữ
                font: 'Mono',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'large',  // Kích thước tên: 'small', 'large'
                sizeBio: 'small',       // Kích thước bio: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'round',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#123864',       // Màu nền nút
                textColor: '#ffffff',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'none'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#111125',
                font: 'Momo',
                size: 'large'           // 'small', 'large'
            }
        }
    }, 

        {
        id: 'custom',
        name: 'Custom',
        type: 'image', // Hiển thị icon bảng màu thay vì ảnh preview
        previewImage: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg', 
        design: {
            themeId: 'custom',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#1F2937',       // Màu chữ
                font: 'Mono',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'large',  // Kích thước tên: 'small', 'large'
                sizeBio: 'small',       // Kích thước bio: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'round',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#123864',       // Màu nền nút
                textColor: '#ffffff',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'none'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#111125',
                font: 'Momo',
                size: 'large'           // 'small', 'large'
            }
        }
    }, 

        {
        id: 'custom',
        name: 'Custom',
        type: 'image', // Hiển thị icon bảng màu thay vì ảnh preview
        previewImage: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg', 
        design: {
            themeId: 'custom',

            // 1. Cấu hình Nền (Background)
            background: {
                type: 'image',           // Loại: 'fill' (màu đơn), 'gradient', 'blur', 'image'
                value: '#F3F4F6',       // Màu chính (hoặc màu bắt đầu gradient)
                imageUrl: '../../public/dark-tree-in-the-middle-of-a-purple-lake-wallpaper.jpg',           // Link ảnh nền (chỉ dùng khi type='image')
                toColor: '#ffffff',     // Màu phụ (dùng cho gradient/blur)
                direction: 'to bottom'  // Hướng gradient
            },

            // 2. Cấu hình Header (Username & Bio)
            header: {
                color: '#1F2937',       // Màu chữ
                font: 'Mono',          // Font chữ (phải khớp với danh sách font hỗ trợ)
                sizeUsername: 'large',  // Kích thước tên: 'small', 'large'
                sizeBio: 'small',       // Kích thước bio: 'small', 'large'
            },

            // 3. Cấu hình Nút (Buttons)
            buttons: {
                shape: 'round',        // Hình dáng: 'square' (vuông), 'medium' (bo nhẹ), 'round' (tròn)
                style: 'glass',         // Kiểu: 'solid' (đặc), 'glass' (kính), 'outline' (viền)
                color: '#123864',       // Màu nền nút
                textColor: '#ffffff',   // Màu chữ trong nút
                shadowColor: '#000000', // Màu bóng đổ
                shadowStyle: 'none'     // Kiểu bóng: 'none', 'subtle', 'strong', 'hard'
            },

            // 4. Cấu hình Text chung (nếu có dùng cho các thành phần khác)
            text: {
                color: '#111125',
                font: 'Momo',
                size: 'large'           // 'small', 'large'
            }
        }
    }, 
];