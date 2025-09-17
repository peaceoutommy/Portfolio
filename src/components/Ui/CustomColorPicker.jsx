// src/components/Ui/CustomColorPicker.jsx
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Icons from './Icons';

/**
 * CustomColorPicker - A professional HSV-based color picker component
 * Uses HSV color model for more intuitive color selection
 */
const CustomColorPicker = ({
    initialColor = '#00ffff',
    onApply,
    onCancel
}) => {
    const [hue, setHue] = useState(180); // 0-360
    const [saturation, setSaturation] = useState(100); // 0-100 (HSV)
    const [value, setValue] = useState(100); // 0-100 (brightness/value)
    const [hexValue, setHexValue] = useState(initialColor);
    const [isDragging, setIsDragging] = useState(false);
    const [dragTarget, setDragTarget] = useState(null);

    const colorAreaRef = useRef(null);
    const hueSliderRef = useRef(null);

    // Convert HSV to RGB
    const hsvToRgb = useCallback((h, s, v) => {
        h = h / 360;
        s = s / 100;
        v = v / 100;

        const c = v * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = v - c;

        let r, g, b;
        if (h < 1 / 6) {
            [r, g, b] = [c, x, 0];
        } else if (h < 2 / 6) {
            [r, g, b] = [x, c, 0];
        } else if (h < 3 / 6) {
            [r, g, b] = [0, c, x];
        } else if (h < 4 / 6) {
            [r, g, b] = [0, x, c];
        } else if (h < 5 / 6) {
            [r, g, b] = [x, 0, c];
        } else {
            [r, g, b] = [c, 0, x];
        }

        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    }, []);

    // Convert RGB to Hex
    const rgbToHex = useCallback((r, g, b) => {
        const toHex = (c) => {
            const hex = Math.round(c).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }, []);

    // Convert HSV to Hex
    const hsvToHex = useCallback((h, s, v) => {
        const rgb = hsvToRgb(h, s, v);
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    }, [hsvToRgb, rgbToHex]);

    // Convert Hex to HSV
    const hexToHsv = useCallback((hex) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;

        let h = 0;
        if (delta !== 0) {
            if (max === r) {
                h = ((g - b) / delta) % 6;
            } else if (max === g) {
                h = (b - r) / delta + 2;
            } else {
                h = (r - g) / delta + 4;
            }
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;

        const s = max === 0 ? 0 : Math.round((delta / max) * 100);
        const v = Math.round(max * 100);

        return { h, s, v };
    }, []);

    // Initialize from hex value
    useEffect(() => {
        const hsv = hexToHsv(initialColor);
        setHue(hsv.h);
        setSaturation(hsv.s);
        setValue(hsv.v);
        setHexValue(initialColor);
    }, [initialColor, hexToHsv]);

    // Update hex when HSV changes
    useEffect(() => {
        const newHex = hsvToHex(hue, saturation, value);
        setHexValue(newHex);
    }, [hue, saturation, value, hsvToHex]);

    // Handle color area interactions (saturation and value)
    const updateColorFromArea = useCallback((e) => {
        if (!colorAreaRef.current) return;

        const rect = colorAreaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        // X-axis: saturation (0-100%)
        // Y-axis: value/brightness (100-0%, inverted so top is brighter)
        const newSaturation = Math.round(x * 100);
        const newValue = Math.round((1 - y) * 100);

        setSaturation(newSaturation);
        setValue(newValue);
    }, []);

    // Handle hue slider interactions
    const updateHueFromSlider = useCallback((e) => {
        if (!hueSliderRef.current) return;

        const rect = hueSliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newHue = Math.round(x * 360);
        setHue(newHue);
    }, []);

    // Mouse event handlers
    const handleColorAreaMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        setDragTarget('colorArea');
        updateColorFromArea(e);
    }, [updateColorFromArea]);

    const handleHueMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        setDragTarget('hueSlider');
        updateHueFromSlider(e);
    }, [updateHueFromSlider]);

    // Global mouse event handlers
    useEffect(() => {
        if (!isDragging) return;

        const handleGlobalMouseMove = (e) => {
            e.preventDefault();

            if (dragTarget === 'colorArea') {
                updateColorFromArea(e);
            } else if (dragTarget === 'hueSlider') {
                updateHueFromSlider(e);
            }
        };

        const handleGlobalMouseUp = (e) => {
            e.preventDefault();
            setIsDragging(false);
            setDragTarget(null);
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.body.style.userSelect = 'none';
        document.body.style.pointerEvents = 'auto';

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.body.style.userSelect = '';
            document.body.style.pointerEvents = '';
        };
    }, [isDragging, dragTarget, updateColorFromArea, updateHueFromSlider]);

    // Handle hex input changes
    const handleHexChange = useCallback((e) => {
        let inputValue = e.target.value.trim();

        // Allow typing without # prefix
        if (!inputValue.startsWith('#') && inputValue.length > 0) {
            inputValue = '#' + inputValue;
        }

        setHexValue(inputValue);

        // Only update HSV if we have a valid hex color and we're not dragging
        if (/^#[0-9A-Fa-f]{6}$/.test(inputValue) && !isDragging) {
            const hsv = hexToHsv(inputValue);
            setHue(hsv.h);
            setSaturation(hsv.s);
            setValue(hsv.v);
        }
    }, [hexToHsv, isDragging]);

    // Current color for display
    const currentRgb = hsvToRgb(hue, saturation, value);
    const currentColor = `rgb(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b})`;
    const hueColor = `hsl(${hue}, 100%, 50%)`;

    return (
        <motion.div
            className="p-3 backdrop-blur-md rounded-lg border select-none shadow-xl bg-[var(--bg-primary)] border-[var(--border-primary)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            {/* Color Preview */}       
            <div className="mb-3 flex items-center gap-2">
                <div
                    className="w-8 h-8 rounded border"
                    style={{ 
                        backgroundColor: currentColor,
                        borderColor: 'var(--border-primary)'
                    }}
                />
                <div className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                    {hexValue.toUpperCase()}
                </div>
            </div>

            {/* Main Color Area (Saturation vs Value) */}
            <div className="mb-3">
                <div
                    ref={colorAreaRef}
                    className="w-full h-24 rounded cursor-crosshair relative overflow-hidden"
                    style={{
                        backgroundColor: hueColor,
                        backgroundImage: `
                            linear-gradient(to top, black 0%, transparent 100%),
                            linear-gradient(to right, white 0%, transparent 100%)
                        `
                    }}
                    onMouseDown={handleColorAreaMouseDown}
                >
                    {/* Picker cursor */}
                    <div
                        className="absolute w-3 h-3 border-2 border-white rounded-full pointer-events-none"
                        style={{
                            left: `${saturation}%`,
                            top: `${100 - value}%`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>
            </div>

            {/* Hue Slider */}
            <div className="mb-3">
                <div
                    ref={hueSliderRef}
                    className="w-full h-5 rounded cursor-pointer relative overflow-hidden border border-gray-600/30"
                    style={{
                        background: 'linear-gradient(to right, #ff0000 0%, #ffff00 16.67%, #00ff00 33.33%, #00ffff 50%, #0000ff 66.67%, #ff00ff 83.33%, #ff0000 100%)'
                    }}
                    onMouseDown={handleHueMouseDown}
                >
                    {/* Hue cursor */}
                    <div
                        className="absolute w-1.5 h-full bg-white border border-gray-300 pointer-events-none"
                        style={{
                            left: `${(hue / 360) * 100}%`,
                            transform: 'translateX(-50%)',
                            borderRadius: '1px'
                        }}
                    />
                </div>
            </div>

            {/* Hex Input */}
            <div className="mb-3">
                <input
                    type="text"
                    value={hexValue}
                    onChange={handleHexChange}
                    className="w-full px-2 py-1.5 border rounded text-sm font-mono 
                             focus:outline-none focus:border-blue-500/70 transition-all"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)'
                    }}
                    placeholder="#000000"
                    maxLength={7}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <Button
                    size="sm"
                    className="flex-1 py-1.5"
                    onClick={() => onApply?.(hexValue)}
                >
                    <Icons name="Apply" />
                </Button>
                <Button
                    size="sm"
                    variant="default"
                    className="flex-1 py-1.5"
                    onClick={onCancel}
                >
                    <Icons name="Cancel" />
                </Button>
            </div>
        </motion.div>
    );
};

export default CustomColorPicker;