import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto show tooltip after 3 seconds, then hide after 5 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    // Get WhatsApp config from localStorage
    const savedWhatsappConfig = localStorage.getItem('supercode_whatsapp');
    const whatsappConfig = savedWhatsappConfig 
      ? JSON.parse(savedWhatsappConfig) 
      : { phoneNumber: '6281234567890', businessName: 'BandungCoding' };
    
    const message = `Halo ${whatsappConfig.businessName}, saya ingin konsultasi mengenai pembuatan website.`;
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-4 transition-all duration-300 ${
            showTooltip ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative bg-white rounded-lg shadow-2xl p-4 min-w-[250px] border border-gray-100">
            {/* Close button */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 p-1 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold text-sm mb-1">
                  Butuh Bantuan? 💬
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Konsultasi gratis untuk project website Anda!
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>
          
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
          
          {/* Icon */}
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white animate-bounce">
            1
          </span>
        </button>
      </div>
    </>
  );
};

export default WhatsAppButton;
