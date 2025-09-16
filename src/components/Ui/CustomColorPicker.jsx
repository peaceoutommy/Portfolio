// src/components/Ui/CustomColorPicker.jsx
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlowText from './GlowText';
import Button from './Button';
import { FaCheck, FaTimes } from 'react-icons/fa';

/**
 * CustomColorPicker - A custom color picker component
 */
const CustomColorPicker = ({
    initialColor = '#00ffff',
    onApply,
    onCancel
}) => {
    const [hue, setHue] = useState(180); // 0-360
    const [saturation, setSaturation] = useState(100); // 0-100
    const [lightness, setLightness] = useState(50); // 0-100
    const [hexValue, setHexValue] = useState(initialColor);
    const [isDragging, setIsDragging] = useState(false);

    const colorAreaRef = useRef(null);
    const hueSliderRef = useRef(null);

    // Convert HSL to Hex
    const hslToHex = useCallback((h, s, l) => {
        h = h / 360;
        s = s / 100;
        l = l / 100;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex = (c) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }, []);

    // Convert Hex to HSL
    const hexToHsl = useCallback((hex) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                default: h = 0;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }, []);

    // Initialize from hex value and update when initialColor changes
    useEffect(() => {
        const hsl = hexToHsl(initialColor);
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
        setHexValue(initialColor);
    }, [initialColor, hexToHsl]);

    // Update hex when HSL changes
    useEffect(() => {
        const newHex = hslToHex(hue, saturation, lightness);
        setHexValue(newHex);
    }, [hue, saturation, lightness, hslToHex]);

    // Handle color area click/drag
    const handleColorAreaMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        setDraggingElement('colorArea');
        updateColorFromArea(e);
    }, []);

    const handleColorAreaMouseMove = useCallback((e) => {
        if (isDragging) {
            updateColorFromArea(e);
        }
    }, [isDragging]);

    const handleColorAreaMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const updateColorFromArea = useCallback((e) => {
        if (!colorAreaRef.current) return;

        const rect = colorAreaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        // X-axis controls saturation (0-100%)
        // Y-axis controls lightness (0-100%, inverted so top is lighter)
        setSaturation(Math.round(x * 100));
        setLightness(Math.round((1 - y) * 100));
    }, []);

    // Handle hue slider
    const handleHueMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        setDraggingElement('hueSlider');
        updateHueFromSlider(e);
    }, []);

    const handleHueMouseMove = useCallback((e) => {
        if (isDragging) {
            updateHueFromSlider(e);
        }
    }, [isDragging]);

    const updateHueFromSlider = useCallback((e) => {
        if (!hueSliderRef.current) return;

        const rect = hueSliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setHue(Math.round(x * 360));
    }, []);

    // Handle hex input
    const handleHexChange = useCallback((e) => {
        const value = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            setHexValue(value);
            const hsl = hexToHsl(value);
            setHue(hsl.h);
            setSaturation(hsl.s);
            setLightness(hsl.l);
        } else if (/^[0-9A-Fa-f]{6}$/.test(value)) {
            const hexWithHash = `#${value}`;
            setHexValue(hexWithHash);
            const hsl = hexToHsl(hexWithHash);
            setHue(hsl.h);
            setSaturation(hsl.s);
            setLightness(hsl.l);
        } else {
            setHexValue(value);
        }
    }, [hexToHsl]);

    // Track which element is being dragged
    const [draggingElement, setDraggingElement] = useState(null);

    // Add global mouse event listeners
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDragging && draggingElement === 'colorArea') {
                handleColorAreaMouseMove(e);
            } else if (isDragging && draggingElement === 'hueSlider') {
                handleHueMouseMove(e);
            }
        };

        const handleGlobalMouseUp = () => {
            setIsDragging(false);
            setDraggingElement(null);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, draggingElement, handleColorAreaMouseMove, handleHueMouseMove]);

    const currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return (
        <motion.div
            className="p-3 bg-black/95 backdrop-blur-md rounded-sm select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ userSelect: 'none' }}
        >
            {/* Color Preview */}
            <div className="mb-3 flex items-center gap-2">
                <div
                    className="w-8 h-8 rounded-sm border-2 border-white/20 shadow-lg"
                    style={{ backgroundColor: currentColor }}
                />
                 <div className="flex-1">
                     <div 
                         className="text-xs font-medium mb-1 font-mono"
                         style={{ color: currentColor }}
                     >
                         {hexValue.toUpperCase()}
                     </div>
                 </div>
            </div>

            {/* Color Area */}
            <div className="mb-3">
                <div
                    ref={colorAreaRef}
                    className="w-full h-24 rounded-lg cursor-crosshair relative overflow-hidden border border-gray-600/30"
                    style={{
                        background: `linear-gradient(to right, 
              hsl(${hue}, 0%, 50%) 0%, 
              hsl(${hue}, 100%, 50%) 100%), 
              linear-gradient(to bottom, 
                hsl(${hue}, 100%, 100%) 0%, 
                hsl(${hue}, 100%, 0%) 100%)`
                    }}
                    onMouseDown={handleColorAreaMouseDown}
                >
                    {/* Color picker cursor */}
                    <div
                        className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none"
                        style={{
                            left: `${saturation}%`,
                            top: `${100 - lightness}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </div>
            </div>

            {/* Hue Slider */}
            <div className="mb-3">
                <div
                    ref={hueSliderRef}
                    className="w-full h-5 rounded-lg cursor-pointer relative overflow-hidden border border-gray-600/30"
                    style={{
                        background: 'linear-gradient(to right, #ff0000 0%, #ffff00 16.66%, #00ff00 33.33%, #00ffff 50%, #0000ff 66.66%, #ff00ff 83.33%, #ff0000 100%)'
                    }}
                    onMouseDown={handleHueMouseDown}
                >
                    {/* Hue slider cursor */}
                    <div
                        className="absolute w-1 h-full bg-white border border-gray-300 rounded-full pointer-events-none"
                        style={{
                            left: `${(hue / 360) * 100}%`,
                            transform: 'translateX(-50%)'
                        }}
                    />
                </div>
            </div>

            {/* Hex Input */}
            <div className="mb-3">
                <label className="block text-xs text-gray-400 mb-1">
                    <GlowText>Hex Value</GlowText>
                </label>
                <input
                    type="text"
                    value={hexValue}
                    onChange={handleHexChange}
                    className="w-full px-2 py-1 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-xs font-mono focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    placeholder="#000000"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <Button
                    size="sm"
                    className="flex-1 flex items-center justify-center p-2 focus:outline-none focus:ring-0 focus:ring-offset-0"
                    onClick={() => onApply?.(hexValue)}
                    title="Apply Color"
                >
                    <FaCheck size={14} />
                </Button>
                <Button
                    size="sm"
                    variant="default"
                    className="flex-1 flex items-center justify-center p-2 focus:outline-none focus:ring-0 focus:ring-offset-0"
                    onClick={onCancel}
                    title="Cancel"
                >
                    <FaTimes size={14} />
                </Button>
            </div>
        </motion.div>
    );
};

export default CustomColorPicker;
