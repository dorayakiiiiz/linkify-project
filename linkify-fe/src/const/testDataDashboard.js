  export const mainMenu = [
    {
      icon: "fa-layer-group",
      label: "My Linkify",
      hasDropdown: true,
      subItems: [{ label: "Links" }, { label: "Shop" }, { label: "Design" }],
    },
    {
      icon: "fa-coins",
      label: "Earn",
      hasDropdown: true,
      subItems: [{ label: "Overview" }, { label: "Earnings" }],
    },
    { icon: "fa-user-group", label: "Audience", hasDropdown: false },
    { icon: "fa-chart-simple", label: "Insights", hasDropdown: false },
  ];

  export const tools = [
    { icon: "fa-regular fa-calendar", label: "Social planner" },
    { icon: "fa-regular fa-comments", label: "Instagram auto-reply" },
    { icon: "fa-solid fa-link", label: "Link shortener" },
    { icon: "fa-solid fa-pencil", label: "Post ideas" },
  ];
    export const links = [
        {
            url: '3',
            title: 'Facebook'
        },

        {
            url: '/',
            title: 'Instagram'
        },
        
                {
            url: '/',
            title: 'Instagram'
        },
                {
            url: '/',
            title: 'Instagram'
        },
                        {
            url: '/',
            title: 'Instagram'
        },
                                {
            url: '/',
            title: 'Instagram'
        },
        

    ]

  export const navItems = [
          // fa-user cho Header
          { name: "Header", iconClass: "fa-solid fa-user", isActive: true },
          // fa-table-cells (ô lưới) cho Theme
          { name: "Theme", iconClass: "fa-solid fa-table-cells", isActive: false },
          // fa-crop-simple (viền đứt) cho Wallpaper
          { name: "Wallpaper", iconClass: "fa-regular fa-square-full", isActive: false }, 
          // fa-font cho Text
          { name: "Text", iconClass: "fa-solid fa-font", isActive: false },
          // fa-bars-staggered (thanh xếp chồng) cho Buttons
          { name: "Buttons", iconClass: "fa-solid fa-bars-staggered", isActive: false },
          // fa-palette cho Colors
          { name: "Colors", iconClass: "fa-solid fa-palette", isActive: false },
      ];
  export const toolCards = [
        // Card 1: Giả lập (không đủ thông tin icon)
        { color: 'bg-yellow-100', content: '...', link: '#' },
        // Card 2: Màu cam
        { color: 'bg-orange-600', content: 'Add a question', link: '#' },
        // Card 3: Màu đỏ đậm
        { color: 'bg-red-800', content: 'BARISTA BASICS', link: '#' },
        // Card 4: Màu vàng mù tạt
        { color: 'bg-yellow-600', content: '...', link: '#' },
        // Card 4: Màu vàng mù tạt
        { color: 'bg-yellow-600', content: '...', link: '#' },
        // Card 4: Màu vàng mù tạt
        { color: 'bg-yellow-600', content: '...', link: '#' },
        // Card 4: Màu vàng mù tạt
        { color: 'bg-yellow-600', content: '...', link: '#' },
        // Card 4: Màu vàng mù tạt
        { color: 'bg-yellow-600', content: '...', link: '#' },
  
      ]
    export const sampleThemes = [
      { id: 'custom', name: 'Custom', type: 'icon', icon: 'brush', color: 'bg-gray-50', selected: true, premium: false },
      { id: 'agate', name: 'Agate', type: 'text', content: 'Aa', color: 'bg-lime-500', premium: true, bgClass: 'bg-agate' },
      { id: 'air', name: 'Air', type: 'text', content: 'Aa', color: 'bg-white', premium: false, border: 'border-gray-200' },
      { id: 'astrid', name: 'Astrid', type: 'text', content: 'Aa', color: 'bg-gray-900', premium: true, text: 'text-white' },
      { id: 'aura', name: 'Aura', type: 'text', content: 'Aa', color: 'bg-amber-50', premium: true, bgClass: 'bg-aura' },
      { id: 'bliss', name: 'Bliss', type: 'text', content: 'Aa', color: 'bg-purple-900', premium: true, bgClass: 'bg-bliss', text: 'text-white' },
      { id: 'blocks', name: 'Blocks', type: 'text', content: 'Aa', color: 'bg-purple-700', premium: true, text: 'text-white' },
      { id: 'bloom', name: 'Bloom', type: 'text', content: 'Aa', color: 'bg-red-700', premium: true, text: 'text-white' },
      { id: 'breeze', name: 'Breeze', type: 'text', content: 'Aa', color: 'bg-pink-300', premium: true },
      { id: 'encore', name: 'Encore', type: 'text', content: 'Aa', color: 'bg-black', premium: true, text: 'text-white' },
      { id: 'grid', name: 'Grid', type: 'text', content: 'Aa', color: 'bg-green-50', premium: true },
      { id: 'groove', name: 'Groove', type: 'text', content: 'Aa', color: 'bg-purple-500', premium: true, text: 'text-white' },
      { id: 'haven', name: 'Haven', type: 'text', content: 'Aa', color: 'bg-gray-300', premium: true },
      { id: 'lake', name: 'Lake', type: 'text', content: 'Aa', color: 'bg-gray-900', premium: false, text: 'text-white' },
      { id: 'mineral', name: 'Mineral', type: 'text', content: 'Aa', color: 'bg-amber-100', premium: false },
  ];

  export const quickActions = [
    { label: 'Add', icon: 'fa-plus' },
    { label: 'Preview', icon: 'fa-eye' }, // Thay thế icon xoắn ốc bằng 'fa-eye'
    { label: 'Design', icon: 'fa-paint-roller' }, // Thay thế icon cọ bằng 'fa-paint-roller'
    // { label: 'Enhance', icon: 'fa-star' }, // Thay thế icon lấp lánh bằng 'fa-star'
  ];