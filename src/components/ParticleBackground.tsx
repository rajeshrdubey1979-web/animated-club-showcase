import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles: HTMLElement[] = [];
    const particleCount = 25; // Increased from 15

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 6-16px (increased size range)
      const size = Math.random() * 10 + 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Add pink gradient background
      particle.style.background = `linear-gradient(135deg, #EC4899, #F472B6)`;
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.4)';
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles with GSAP
    particles.forEach((particle, index) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.7 + 0.4 // Increased opacity range
      });

      gsap.to(particle, {
        x: `+=${Math.random() * 400 - 200}`, // Increased movement range
        y: `+=${Math.random() * 400 - 200}`, // Increased movement range
        rotation: 360,
        duration: Math.random() * 8 + 4, // Faster speed (was 20 + 10)
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1 // Faster stagger
      });
    });

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default ParticleBackground;