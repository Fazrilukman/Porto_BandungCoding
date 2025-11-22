import React from 'react';
import { Instagram, Mail, Phone, MapPin, ExternalLink, Heart, Youtube, MessageCircle } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#About' },
      { name: 'Our Team', href: '#About' },
      { name: 'Portfolio', href: '#Portofolio' },
      { name: 'Blog', href: '#Blog' },
    ],
    services: [
      { name: 'Web Development', href: '#Portofolio' },
      { name: 'UI/UX Design', href: '#Portofolio' },
      { name: 'Mobile Apps', href: '#Portofolio' },
      { name: 'SEO Services', href: '#Contact' },
    ],
    support: [
      { name: 'Contact Us', href: '#Contact' },
      { name: 'FAQ', href: '#Contact' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ]
  };

  const socialLinks = [
    { 
      icon: Instagram, 
      link: 'https://www.instagram.com/',
      name: 'Instagram',
      color: 'hover:text-[#E4405F]'
    },
    { 
      icon: FaTiktok, 
      link: 'https://www.tiktok.com/',
      name: 'TikTok',
      color: 'hover:text-white'
    },
    { 
      icon: MessageCircle, 
      link: 'https://wa.me/6281234567890',
      name: 'WhatsApp',
      color: 'hover:text-[#25D366]'
    },
    { 
      icon: Youtube, 
      link: 'https://www.youtube.com/',
      name: 'YouTube',
      color: 'hover:text-[#FF0000]'
    },
  ];

  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#030014] border-t border-white/10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6366f1]/5 to-[#a855f7]/5 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-2">
                  BandungCoding
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Tim developer profesional yang berdedikasi menciptakan solusi digital inovatif untuk bisnis Anda.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="mailto:info@bandungcoding.com" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">info@bandungcoding.com</span>
                </a>
                
                <a 
                  href="tel:+6281234567890" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+62 812-3456-7890</span>
                </a>
                
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="p-2 bg-white/5 rounded-lg mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Indonesia</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Connected</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Ikuti kami untuk update terbaru dan tips seputar web development.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 bg-white/5 hover:bg-gradient-to-r hover:from-[#6366f1]/20 hover:to-[#a855f7]/20 rounded-lg transition-all duration-300 border border-white/10 hover:border-purple-400/50`}
                      title={social.name}
                    >
                      <social.icon className={`w-5 h-5 text-gray-300 ${social.color} transition-colors duration-300`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <div className="bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-white text-sm font-semibold mb-2">Ready to Start?</p>
                <p className="text-gray-400 text-xs mb-3">Konsultasi gratis untuk project Anda</p>
                <a
                  href="#Contact"
                  onClick={(e) => scrollToSection(e, '#Contact')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all group"
                >
                  Contact Us
                  <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-1">
                © {currentYear}{" "}
                <a 
                  href="https://bandungcoding.com/" 
                  className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                >
                  BandungCoding
                </a>
                . Made with 
                <Heart className="w-4 h-4 text-red-500 fill-current mx-1 animate-pulse" />
                in Indonesia
              </p>
            </div>

            {/* Bottom Links */}
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6366f1]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
