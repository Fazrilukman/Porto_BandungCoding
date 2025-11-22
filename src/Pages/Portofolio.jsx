import React, { useEffect, useState, useCallback } from "react";

// import { supabase } from "../supabase"; 

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Check, Zap, Package, X } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks tetap sama
// Remove the const techStacks declaration outside component
export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [techStacks, setTechStacks] = useState([
    { icon: "html.svg", language: "HTML" },
    { icon: "css.svg", language: "CSS" },
    { icon: "javascript.svg", language: "JavaScript" },
    { icon: "tailwind.svg", language: "Tailwind CSS" },
    { icon: "reactjs.svg", language: "ReactJS" },
    { icon: "vite.svg", language: "Vite" },
    { icon: "nodejs.svg", language: "Node JS" },
    { icon: "bootstrap.svg", language: "Bootstrap" },
    { icon: "firebase.svg", language: "Firebase" },
    { icon: "MUI.svg", language: "Material UI" },
    { icon: "vercel.svg", language: "Vercel" },
    { icon: "SweetAlert.svg", language: "SweetAlert2" },
  ]);
  const [certificates, setCertificates] = useState([]);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    usaha: '',
    jenisUsaha: '',
    catatan: ''
  });
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Load from localStorage (Admin data)
      const savedProjects = localStorage.getItem('supercode_projects');
      const savedTechStack = localStorage.getItem('supercode_techstack');
      const savedCarousel = localStorage.getItem('supercode_carousel');
      
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        // Default projects if localStorage is empty
        const defaultProjects = [
          {
            id: 1,
            name: 'E-Commerce Platform',
            image: 'https://placehold.co/800x600/4f46e5/ffffff/png?text=E-Commerce+Platform',
            techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
            description: 'Modern e-commerce solution with payment integration, shopping cart, user authentication, and admin dashboard. Built with scalability and performance in mind.',
            category: 'Web Development',
            link: '',
            featured: true,
            Features: [
              'User Authentication & Authorization',
              'Shopping Cart & Wishlist',
              'Payment Gateway Integration',
              'Admin Dashboard',
              'Product Search & Filtering',
              'Responsive Design'
            ],
            Github: 'Private'
          },
          {
            id: 2,
            name: 'Portfolio Website',
            image: 'https://placehold.co/800x600/8b5cf6/ffffff/png?text=Portfolio+Website',
            techStack: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
            description: 'Creative portfolio website with modern animations and smooth transitions. Showcasing projects, skills, and professional experience with an elegant design.',
            category: 'Web Development',
            link: '',
            featured: true,
            Features: [
              'Smooth Page Transitions',
              'Interactive Animations',
              'Project Showcase Gallery',
              'Contact Form Integration',
              'Mobile Responsive',
              'Dark Mode Support'
            ],
            Github: 'Private'
          },
          {
            id: 3,
            name: 'Dashboard Analytics',
            image: 'https://placehold.co/800x600/6366f1/ffffff/png?text=Dashboard+Analytics',
            techStack: ['React', 'Chart.js', 'Firebase', 'Material-UI'],
            description: 'Real-time analytics dashboard with data visualization, charts, and metrics tracking. Perfect for monitoring business KPIs and making data-driven decisions.',
            category: 'Web Development',
            link: '',
            featured: true,
            Features: [
              'Real-time Data Updates',
              'Interactive Charts & Graphs',
              'Custom Metrics Tracking',
              'Export Reports (PDF/Excel)',
              'Multi-user Support',
              'Data Filtering & Search'
            ],
            Github: 'Private'
          }
        ];
        setProjects(defaultProjects);
        localStorage.setItem('supercode_projects', JSON.stringify(defaultProjects));
      }
      
      // Load carousel images
      if (savedCarousel) {
        setCarouselImages(JSON.parse(savedCarousel));
      }
      
      // Update techStacks from admin if available
      if (savedTechStack) {
        const adminTechStack = JSON.parse(savedTechStack);
        // Convert admin format to portfolio format
        const formattedTechStack = adminTechStack.map(tech => ({
          icon: tech.icon, // Using emoji as icon
          language: tech.name,
          category: tech.category
        }));
        setTechStacks(formattedTechStack);
      }
      
      setCertificates([]);
    } catch (error) {
      console.warn("⚠️ Error loading data:", error.message);
      setProjects([]);
      setCertificates([]);
    }
  }, []);



  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  // Scroll to paket section if hash exists
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#paket-section') {
      // Multiple attempts to ensure scroll happens after page load
      const scrollToPaket = () => {
        const element = document.getElementById('paket-section');
        if (element) {
          const offset = 80; // Offset for navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

      // Try immediately
      setTimeout(scrollToPaket, 100);
      // Try again after DOM fully loaded
      setTimeout(scrollToPaket, 500);
      // Final attempt after all assets loaded
      setTimeout(scrollToPaket, 1000);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (packageName) => {
    setSelectedPackage(packageName);
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setFormData({
      nama: '',
      whatsapp: '',
      usaha: '',
      jenisUsaha: '',
      catatan: ''
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get WhatsApp config from localStorage
    const savedWhatsappConfig = localStorage.getItem('supercode_whatsapp');
    const whatsappConfig = savedWhatsappConfig 
      ? JSON.parse(savedWhatsappConfig) 
      : { phoneNumber: '6281234567890', businessName: 'BandungCoding' };
    
    const message = `*Pemesanan ${selectedPackage}*\n\nNama: ${formData.nama}\nNo. WhatsApp: ${formData.whatsapp}\nNama Usaha: ${formData.usaha}\nJenis Usaha: ${formData.jenisUsaha}\nCatatan: ${formData.catatan || '-'}`;
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    handleCloseModal();
  };

  const displayedProjects = projects.slice(0, 3);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      
      {/* Auto Scrolling Project Showcase */}
      <div className="w-full mb-16" data-aos="fade-up">
        <div className="mb-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Our Latest Projects
          </h3>
          <p className="text-slate-400 text-sm">
            Explore our recent work and innovations
          </p>
        </div>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={3500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="project-swiper"
        >
          {(carouselImages.length > 0 ? carouselImages : projects.slice(0, 6)).map((item, index) => (
            <SwiperSlide key={item.id || index}>
              <div className="w-full h-[280px] rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                <img 
                  src={item.imageUrl || item.image}
                  alt={item.title || item.name || `Project ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {e.target.src = 'https://placehold.co/400x300/4f46e5/ffffff?text=No+Image'}}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore our team projects and technical expertise. 
          Each section showcases our collaborative work and skills.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <Code size={64} className="mx-auto mb-4 text-purple-400 opacity-50" />
                  <p className="text-slate-400 text-lg">No projects yet. Add your first project in the <a href="/admin" className="text-purple-400 hover:text-purple-300 underline">Admin Dashboard</a>!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                  {displayedProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                        {project.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-white">{project.name || project.title}</h3>
                          <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {(project.techStack || []).slice(0, 3).map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <a 
                            href={`/project/${project.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group"
                          >
                            View Project
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {projects.length > 3 && (
              <div className="mt-8 w-full flex justify-center">
                <a
                  href="/all-projects"
                  className="px-8 py-3 text-white text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>View All Projects</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>

      {/* Paket Pembuatan Website Section */}
      <div id="paket-section" className="mt-20 mb-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Investasi Terbaik untuk Website Anda
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm md:text-base">
            Pilih paket website yang sesuai dengan kebutuhan bisnis Anda. Harga terjangkau dengan kualitas premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Paket Landing Page */}
          <div 
            className="relative bg-white dark:bg-gray-900/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Landing Page</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Solusi website paling profesional untuk bisnis Anda</p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">Rp 699K</span>
                <span className="text-slate-500 text-sm">one-time</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Desain Modern & Responsif',
                'Optimasi SEO On-Page',
                'Form Contact & WhatsApp',
                'Integrasi Google Analytics',
                'Integrasi Social Media',
                'SSL Security (HTTPS)',
                'Speed Optimization',
                'Free Domain .com',
                'Free Hosting 1 Tahun',
                '3x Revisi'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleOpenModal('Landing Page')}
              className="w-full h-12 py-3 px-6 rounded-xl bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-500/30 font-semibold hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center"
            >
              Pilih Landing Page
            </button>
          </div>

          {/* Paket Company Profile - Most Popular */}
          <div 
            className="relative rounded-2xl p-8 shadow-2xl scale-105 bg-gradient-to-br from-purple-600 to-blue-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold shadow-lg">
                Most Popular
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Company Profile</h3>
            <p className="text-sm text-purple-100 mb-4">Website company profile lengkap untuk perusahaan</p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">Rp 1.999K</span>
                <span className="text-purple-100 text-sm">one-time</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Desain Premium & Responsif',
                'Full SEO Optimization',
                'CMS Admin Panel',
                'Blog/News System',
                'Form Contact & WhatsApp',
                'Google Maps Integration',
                'Google Analytics & Search Console',
                'Social Media Integration',
                'SSL Security (HTTPS)',
                'Advanced Speed Optimization',
                'Free Domain .com',
                'Free Hosting 1 Tahun',
                'Free Email Bisnis',
                'Free Maintenance 6 Bulan',
                '5x Revisi'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleOpenModal('Company Profile')}
              className="w-full h-12 py-3 px-6 rounded-xl bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg flex items-center justify-center"
            >
              Pilih Company Profile
            </button>
          </div>

          {/* Paket Custom Website */}
          <div 
            className="relative bg-white dark:bg-gray-900/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Custom Website</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Solusi website custom sesuai kebutuhan bisnis Anda</p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">Rp 2.999K</span>
                <span className="text-slate-500 text-sm">starts from</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                'Analisis Kebutuhan Bisnis',
                'Custom Design Premium',
                'Custom Development',
                'Database Design',
                'API Integration',
                'Payment Gateway',
                'Advanced Security',
                'High Performance Setup',
                'Premium SEO Setup',
                'Server Optimization',
                'Free Domain .com',
                'Free Hosting 1 Tahun',
                'Free Email Bisnis',
                'Free Maintenance 1 Tahun',
                'Unlimited Revision'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleOpenModal('Custom Website')}
              className="w-full h-12 py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
            >
              Konsultasi Gratis
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          Butuh solusi khusus? <button onClick={() => {
            const savedWhatsappConfig = localStorage.getItem('supercode_whatsapp');
            const whatsappConfig = savedWhatsappConfig 
              ? JSON.parse(savedWhatsappConfig) 
              : { phoneNumber: '6281234567890', businessName: 'BandungCoding' };
            const message = `Halo ${whatsappConfig.businessName}, saya ingin konsultasi mengenai pembuatan website custom.`;
            const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }} className="text-purple-600 dark:text-purple-400 underline hover:text-purple-700 dark:hover:text-purple-300">Konsultasikan kebutuhan Anda</button>
        </p>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-5 gap-0">
              {/* Left Side - Package Info */}
              <div className="md:col-span-2 bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none text-white">
                <h3 className="text-xl font-bold mb-4">Paket {selectedPackage}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-100">Harga:</span>
                    <span className="font-bold">
                      {selectedPackage === 'Landing Page' ? 'Rp 699K' : 
                       selectedPackage === 'Company Profile' ? 'Rp 1.999K' : 
                       selectedPackage === 'Custom Website' ? 'Rp 2.999K' : 'Custom'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-100">Maintenance:</span>
                    <span className="font-semibold">
                      {selectedPackage === 'Company Profile' ? '6 Bulan' : 
                       selectedPackage === 'Custom Website' ? '1 Tahun' : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-100">Revisi:</span>
                    <span className="font-semibold">
                      {selectedPackage === 'Landing Page' ? '3x' : 
                       selectedPackage === 'Company Profile' ? '5x' : 
                       'Unlimited'}
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <h4 className="font-semibold mb-2 text-sm">Fitur yang Didapat:</h4>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Desain Premium & Responsif</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Full SEO Optimization</span>
                    </li>
                    {selectedPackage === 'Company Profile' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          <span>CMS Admin Panel</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3 h-3" />
                          <span>Blog/News System</span>
                        </li>
                      </>
                    )}
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Form Contact & WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Google Maps Integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Google Analytics & Search Console</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Social Media Integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>SSL Security (HTTPS)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Advanced Speed Optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Free Domain .com</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Free Hosting 1 Tahun</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Free Email Bisnis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      <span>Free Maintenance 6 Bulan</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="md:col-span-3 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Data Pemesanan</h3>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleFormChange}
                      placeholder="Nama lengkap Anda"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      No. WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleFormChange}
                      placeholder="Contoh: 08123456789"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Usaha/Perusahaan
                    </label>
                    <input
                      type="text"
                      name="usaha"
                      value={formData.usaha}
                      onChange={handleFormChange}
                      placeholder="Nama usaha atau perusahaan"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jenis Usaha
                    </label>
                    <select
                      name="jenisUsaha"
                      value={formData.jenisUsaha}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Pilih jenis usaha</option>
                      <option value="Perdagangan">Perdagangan</option>
                      <option value="Jasa">Jasa</option>
                      <option value="Manufaktur">Manufaktur</option>
                      <option value="F&B">F&B (Food & Beverage)</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Kesehatan">Kesehatan</option>
                      <option value="Properti">Properti</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catatan (Optional)
                    </label>
                    <textarea
                      name="catatan"
                      value={formData.catatan}
                      onChange={handleFormChange}
                      rows="3"
                      placeholder="Tuliskan kebutuhan khusus atau pertanyaan Anda"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 py-2.5 px-6 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Kirim via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for Swiper Customization */}
      <style jsx>{`
        .project-swiper {
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}