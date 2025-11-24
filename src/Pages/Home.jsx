import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white dark:bg-black/40 backdrop-blur-xl border border-purple-200 dark:border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-500 dark:text-blue-400" />
          Jasa Website Profesional
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tight flex flex-col md:flex-row items-center justify-center md:gap-4">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#1e293b] via-[#4338ca] to-[#7c3aed] bg-clip-text text-transparent">
          Bandung
        </span>
      </span>
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#4338ca] to-[#7c3aed] bg-clip-text text-transparent">
          Coding
        </span>
      </span>
    </h1>
    <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] font-light mt-4">
      Jasa Pembuatan Website Profesional
    </p>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ onClick, text, icon: Icon }) => (
  <button onClick={onClick} className="group relative w-full sm:w-auto min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
    <div className="absolute -inset-1 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-lg group-hover:opacity-90 transition-all duration-700"></div>
    <div className="relative h-12 sm:h-14 lg:h-16 bg-white dark:bg-[#030014] backdrop-blur-xl rounded-lg border border-purple-300 dark:border-white/10 leading-none overflow-hidden px-4 sm:px-6 lg:px-8 shadow-md dark:shadow-none">
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
      <span className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-lg lg:text-xl group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300">
        <span className="font-semibold z-10 text-slate-800 dark:text-white">
          {text}
        </span>
        <Icon className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-slate-700 dark:text-white ${text === 'Pesan Sekarang' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
      </span>
    </div>
  </button>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Solusi Website Profesional untuk Bisnis Anda", "Desain Modern & Responsif", "Harga Terjangkau, Kualitas Premium"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind", "Firebase", "MySQL"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/BandungCoding" },
  { icon: Linkedin, link: "https://www.linkedin.com/" },
  { icon: Instagram, link: "https://www.instagram.com/" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      const yOffset = 80; // offset to account for navbar height
      const y = target.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  const handleContactClick = () => scrollToSection('Contact');
  const handlePackagesClick = () => scrollToSection('paket-section');

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[1.1] rotate-3" 
        : "scale-100"
    }`
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen flex items-center justify-center py-20">
          <div className="flex flex-col items-center justify-center gap-12 sm:gap-16 max-w-6xl mx-auto">
            
            {/* Main Content - Centered */}
            <div className="w-full space-y-6 sm:space-y-8 text-center"
              data-aos="fade-up"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-center">
                  <StatusBadge />
                </div>
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center justify-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-200 font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Kami menyediakan jasa pembuatan website profesional dengan desain modern, responsif, dan SEO-friendly. Wujudkan website impian Anda dengan harga terjangkau dan kualitas terbaik.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 items-stretch w-full max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="1200">
                  <CTAButton onClick={handleContactClick} text="Pesan Sekarang" icon={Mail} />
                  <CTAButton onClick={handlePackagesClick} text="Lihat Paket" icon={ExternalLink} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
