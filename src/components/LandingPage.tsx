import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import clubLogo from '@/assets/club-logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const logoRef = useRef<HTMLImageElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial states
    gsap.set([logoRef.current, titleRef.current], { y: -50, opacity: 0 });
    gsap.set(flyerRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(buttonRef.current, { y: 50, opacity: 0 });

    // Entrance animations
    tl.to(logoRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(flyerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Button hover animation setup
    const button = buttonRef.current;
    if (button) {
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const handleViewCertificate = () => {
    // Page transition animation
    gsap.to([logoRef.current, flyerRef.current, buttonRef.current, titleRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.in",
      onComplete: () => navigate('/certificate')
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      {/* Logo Section */}
      <div className="text-center mb-12">
        <img
          ref={logoRef}
          src={clubLogo}
          alt="Club Logo"
          className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl"
        />
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold glow-text mb-4"
        >
          Premium Club
        </h1>
        <p className="text-muted-foreground text-lg">
          Exclusive Member Events & Certificates
        </p>
      </div>

      {/* Flyer Container */}
      <div
        ref={flyerRef}
        className="glass-card p-8 mb-12 w-full max-w-md text-center"
      >
        <div className="w-full h-64 bg-gradient-glass rounded-lg flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 opacity-50"></div>
            <p className="text-muted-foreground">
              Custom Flyer<br />
              <span className="text-sm">Will be added here</span>
            </p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-2">Event Announcement</h3>
        <p className="text-muted-foreground text-sm">
          Your exclusive event details will be displayed here
        </p>
      </div>

      {/* View Certificate Button */}
      <Button
        ref={buttonRef}
        onClick={handleViewCertificate}
        className="btn-premium text-lg px-8 py-4"
      >
        View Certificate
      </Button>
    </div>
  );
};

export default LandingPage;