

const CyberpunkChevron = () => {
  return (
    <div className="cyberpunk-chevron-container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 500"
        className="smooth-chevron"
        shapeRendering="geometricPrecision"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main chevron path */}
        <path
          d="M50,50 L200,200 L350,350 L450,450 L500,500 L550,450 L650,350 L800,200 L950,50"
          stroke="var(--highlight-color)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="main-chevron-path"
        />

        {/* Accents */}
        <line x1="100" y1="100" x2="150" y2="150" stroke="var(--highlight-color)" strokeWidth="10" opacity="0.9" vectorEffect="non-scaling-stroke" />
        <line x1="250" y1="250" x2="300" y2="300" stroke="var(--highlight-color)" strokeWidth="10" opacity="0.9" vectorEffect="non-scaling-stroke" />
        <line x1="700" y1="300" x2="750" y2="250" stroke="var(--highlight-color)" strokeWidth="10" opacity="0.9" vectorEffect="non-scaling-stroke" />
        <line x1="850" y1="150" x2="900" y2="100" stroke="var(--highlight-color)" strokeWidth="10" opacity="0.9" vectorEffect="non-scaling-stroke" />

        {/* Data points */}
        {[50, 200, 350, 500, 650, 800, 950].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={x}
            r="10"
            fill="var(--highlight-color)"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Additional ambient points */}
        <circle cx="20" cy="20" r="5" fill="var(--highlight-color)" opacity="0.6" />
        <circle cx="980" cy="20" r="5" fill="var(--highlight-color)" opacity="0.6" />
        <circle cx="400" cy="400" r="5" fill="var(--highlight-color)" opacity="0.6" />
        <circle cx="600" cy="400" r="5" fill="var(--highlight-color)" opacity="0.6" />

        {/* Tech lines */}
        <line x1="300" y1="350" x2="400" y2="350" stroke="var(--highlight-color)" strokeWidth="5" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="600" y1="350" x2="700" y2="350" stroke="var(--highlight-color)" strokeWidth="5" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="450" y1="450" x2="450" y2="480" stroke="var(--highlight-color)" strokeWidth="5" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <line x1="550" y1="450" x2="550" y2="480" stroke="var(--highlight-color)" strokeWidth="5" opacity="0.3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

export default CyberpunkChevron;
