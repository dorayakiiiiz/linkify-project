export const creatorMenu = [
    {
        icon: "fa-layer-group",
        label: "My Linkify",
        hasDropdown: true,
        subItems: [{ label: "Links" }, { label: "Shop" }, { label: "Design" }],
    },
    { icon: "fa-chart-simple", label: "Insights", hasDropdown: false },
];

export const adminMenu = [
    { icon: "fa-solid fa-users", label: "User", hasDropdown: false },
    {
        icon: "fa-solid fa-link",
        label: "Content",
        hasDropdown: true,
        subItems: [{ label: "Links" }, { label: "Shop" }],
    },
    { icon: "fa-brands fa-uikit", label: "Theme", hasDropdown: false },

];

export const tools = [
    { icon: "fa-solid fa-pencil", label: "Post ideas" },
    { icon: "fa-solid fa-link", label: "Link shortener" },
];

export const designNavItems = [
    { name: "Header", iconClass: "fa-solid fa-user" },
    { name: "Theme", iconClass: "fa-solid fa-table-cells" },
    { name: "Background", iconClass: "fa-regular fa-square-full" },
    { name: "Text", iconClass: "fa-solid fa-font" },
    { name: "Buttons", iconClass: "fa-solid fa-bars-staggered" },
    { name: "Colors", iconClass: "fa-solid fa-palette" },
];

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
    { label: 'Preview', icon: 'fa-eye' },
    { label: 'Design', icon: 'fa-paint-roller' },
];

export const insightMetrics = [
    { label: 'Views', value: '0', icon: 'fa-eye' },
    { label: 'Clicks', value: '0', icon: 'fa-solid fa-arrow-pointer' },
    { label: 'Click rate', value: '0%', icon: 'fa-percent' },
    { label: 'Subscribers', value: '0', icon: 'fa-user' },
    { label: 'Earnings', value: '$0.00', icon: 'fa-solid fa-shop' },
];