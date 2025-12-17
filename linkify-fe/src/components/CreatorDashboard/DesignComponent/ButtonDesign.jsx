import ColorPickerItem from "./ColorPickerItem"
import { useProfile } from "../../../context/ProfileContext"; // Import context

export default function ButtonDesign() {
    const { profile, updateDesign } = useProfile(); // Lấy hàm updateDesign

    //[LOGIC SHAPE BUTTON]
    // Lấy giá trị hiện tại từ profile, mặc định là 'rounded'
    const currentShape = profile?.design?.buttons?.shape || 'medium';
    // Hàm xử lý thay đổi shape
    const handleShapeChange = (shape) => {
        updateDesign({
            buttons: {
                ...profile?.design?.buttons,
                shape: shape
            }
        });
    };

    //[LOGIC STYLE BUTTON]
    //Lấy giá trị hiện tại từ profile, mặc định là 'solid'
    const currentStyle = profile?.design?.buttons?.style || 'solid';
    const handleStyleChange = (style) => {
        updateDesign({
            buttons: { ...profile?.design?.buttons, style }
        });
    };

    // --- SHADOW LOGIC ---
    const currentShadow = profile?.design?.buttons?.shadowStyle || 'none';
    const handleShadowChange = (shadowStyle) => {
        updateDesign({
            buttons: { ...profile?.design?.buttons, shadowStyle }
        });
    };

    return (
        <div>
            <div className="mb-8">
                <h3 className="text-gray-700 text-lg font-semibold mb-3">Button style</h3>
                {/* Button style */}
                <div className="flex space-x-3">
                    {/* Solid Button */}
                    <button 
                        onClick={() => handleStyleChange('solid')}
                        className={`flex-1 py-3 px-4 text-center border-2 rounded-lg shadow-sm font-medium transition-colors
                            ${currentStyle === 'solid' 
                                ? 'text-gray-900 border-gray-900 bg-white' 
                                : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Solid
                    </button>

                    {/* Glass Button */}
                    <button 
                        onClick={() => handleStyleChange('glass')}
                        className={`flex-1 py-3 px-4 text-center border-2 rounded-lg font-medium relative transition-colors
                            ${currentStyle === 'glass' 
                                ? 'text-gray-900 border-gray-900 bg-white' 
                                : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Glass
                    </button>

                    {/* Outline Button */}
                    <button 
                        onClick={() => handleStyleChange('outline')}
                        className={`flex-1 py-3 px-4 text-center border-2 rounded-lg font-medium transition-colors
                            ${currentStyle === 'outline' 
                                ? 'text-gray-900 border-gray-900 bg-white' 
                                : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Outline
                    </button>
                </div>
            </div>
            
            <hr className="mb-8 border-gray-200" />

            {/* Button Options */}
            <h3 className="text-gray-700 text-lg font-semibold mb-4">Button Options</h3>

            {/* Corners (3 Buttons: Square, Medium, Round) */}
            <div className="mb-6">
                <div className="flex flex-wrap items-center gap-8">
                    <span className="text-gray-700 block w-20">Corners</span>
                    <div className="flex space-x-3 flex-1">
                        {/* Square Button */}
                        <button 
                            onClick={() => handleShapeChange('square')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShape === 'square' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Square
                        </button>

                        {/* Medium Button (Rounded) */}
                        <button 
                            onClick={() => handleShapeChange('medium')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShape === 'medium' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Medium
                        </button>

                        {/* Round Button (Pill) */}
                        <button 
                            onClick={() => handleShapeChange('round')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShape === 'round' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Round
                        </button>
                    </div>
                </div>
            </div>

            {/* Shadow */}
            <div className="mb-8">
                <div className="flex flex-wrap items-center gap-8">
                    <span className="text-gray-700 block w-20">Shadow</span>
                    <div className="flex space-x-3 flex-1">
                        {/* None */}
                        <button 
                            onClick={() => handleShadowChange('none')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShadow === 'none' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            None
                        </button>

                        {/* Subtle */}
                        <button 
                            onClick={() => handleShadowChange('subtle')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShadow === 'subtle' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Subtle
                        </button>

                        {/* Strong */}
                        <button 
                            onClick={() => handleShadowChange('strong')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShadow === 'strong' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Strong
                        </button>

                        {/* Hard */}
                        <button 
                            onClick={() => handleShadowChange('hard')}
                            className={`flex-1 py-2 text-center border rounded-lg font-medium transition-colors
                                ${currentShadow === 'hard' 
                                    ? 'text-gray-900 border-gray-900 bg-white shadow-sm ring-1 ring-gray-900' 
                                    : 'text-gray-500 border-gray-200 bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            Hard
                        </button>
                    </div>

                </div>
            </div>
            
            <hr className="mb-8 border-gray-200" />

            {/* Colors */}
            <h3 className="text-gray-700 text-lg font-semibold mb-4">Colors</h3>

            {/* Button color */}
            <ColorPickerItem 
                label="Button color" 
                designSection="buttons" 
                colorKey="color" 
            />

            {/* Text color */}
            <ColorPickerItem 
                label="Button text color" 
                designSection="buttons" 
                colorKey="textColor" 
            />
        </div>
    )
}