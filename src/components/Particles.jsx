import { useParticles } from '../hooks/useParticles';

const Particles = ({ className = '' }) => {
  const particles = useParticles({
    count: window.innerWidth > 768 ? 50 : 25,
    minSize: 1,
    maxSize: 5,
    speed: { min: 10, max: 40 }
  });
  
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="hero-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.posX}%`,
            top: `${particle.posY}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            background: 'var(--highlight-color)',
            boxShadow: '0 0 6px var(--highlight-color)',
            position: 'absolute',
            borderRadius: '50%',
            animation: 'float-particle infinite ease-in-out'
          }}
        />
      ))}
    </div>
  );
};

export default Particles;