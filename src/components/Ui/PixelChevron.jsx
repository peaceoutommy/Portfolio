import GlowText from "./GlowText";

const PixelChevron = () => {
  return (
    <GlowText intensity='high' hover>
      <svg width="24" height="12" viewBox="0 0 24 12" className="pixel-chevron">
        {/* Draw exact pixel art chevron using rectangles for precise control */}
        <rect x="6" y="0" width="3" height="3" fill="var(--highlight-color)" />
        <rect x="9" y="3" width="3" height="3" fill="var(--highlight-color)" />
        <rect x="12" y="6" width="3" height="3" fill="var(--highlight-color)" />
        <rect x="15" y="3" width="3" height="3" fill="var(--highlight-color)" />
        <rect x="18" y="0" width="3" height="3" fill="var(--highlight-color)" />
      </svg>
    </GlowText>
  );
};

export default PixelChevron;
