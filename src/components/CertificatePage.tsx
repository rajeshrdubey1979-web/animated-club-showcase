import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import certificateImage from '@/assets/certificate.png';

const CertificatePage = () => {
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create confetti effect
    createConfetti();

    // Entrance animations
    const tl = gsap.timeline();

    gsap.set([certificateRef.current, buttonRef.current, backButtonRef.current], {
      scale: 0.8,
      opacity: 0
    });

    tl.to(certificateRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to([buttonRef.current, backButtonRef.current], {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.5");

  }, []);

  const createConfetti = () => {
    if (!confettiRef.current) return;

    const colors = ['#8B5CF6', '#A855F7', '#F59E0B', '#EAB308'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.pointerEvents = 'none';
      confetti.style.borderRadius = '50%';
      confetti.style.zIndex = '1000';

      confettiRef.current.appendChild(confetti);

      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 3 + 2,
        ease: "power2.out",
        onComplete: () => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }
      });
    }
  };

  const handleDownload = () => {
    // Create download link
    const link = document.createElement('a');
    link.href = certificateImage;
    link.download = 'premium-club-certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Button animation feedback
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const handleBack = () => {
    // Page transition animation
    gsap.to([certificateRef.current, buttonRef.current, backButtonRef.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.in",
      onComplete: () => navigate('/')
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      {/* Confetti Container */}
      <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Back Button */}
      <Button
        ref={backButtonRef}
        onClick={handleBack}
        variant="ghost"
        className="absolute top-6 left-6 text-primary hover:text-primary-foreground hover:bg-primary/20"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Button>

      {/* Certificate */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold glow-text mb-8">
          Your Certificate
        </h1>
        
        <div className="glass-card p-6 max-w-4xl">
          <img
            ref={certificateRef}
            src={certificateImage}
            alt="Premium Club Certificate"
            className="w-full h-auto rounded-lg shadow-premium"
          />
        </div>
      </div>

      {/* Download Button */}
      <Button
        ref={buttonRef}
        onClick={handleDownload}
        className="btn-accent text-lg px-8 py-4"
      >
        <Download className="w-5 h-5 mr-2" />
        Download Certificate
      </Button>

      <p className="text-muted-foreground mt-4 text-center">
        Congratulations on your achievement!<br />
        <span className="text-sm">Save this certificate for your records</span>
      </p>
    </div>
  );
};

export default CertificatePage;