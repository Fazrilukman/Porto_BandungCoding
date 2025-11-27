import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import { AnimatePresence } from 'framer-motion';
import notfound from "./Pages/404";
import NotFoundPage from "./Pages/404";
import Admin from "./Pages/Admin";
import Blog from "./Pages/Blog";
import BlogDetail from "./Pages/BlogDetail";
import AllProjects from "./Pages/AllProjects";
import AllBlogs from "./Pages/AllBlogs";

// 1. JANGAN LUPA IMPORT SUPABASE CLIENT
import { supabase } from "./supabaseClient"; 
const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      <Home />
      <About />
      <Portofolio />
      <Blog />
      <ContactPage />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
    <WhatsAppButton />
  </>
);

function App() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  // ============================================
  // 2. BAGIAN INI SAYA PERBAIKI (DARI SUPABASE)
  // ============================================
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        // Ambil URL logo dari tabel site_settings di Supabase
        // Pastikan 'site_icon' sesuai dengan nama key di database Anda
        // Jika di Admin panel Anda menyimpannya sebagai 'logo' atau 'favicon', ganti 'site_icon' dibawah.
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'site_icon') 
          .single();

        if (data && data.value) {
          // Cari elemen <link rel="icon">
          let link = document.querySelector("link[rel~='icon']");
          
          // Jika belum ada, buat baru
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          
          // Ganti gambar
          link.href = data.value;
        }
      } catch (err) {
        console.error("Gagal memuat favicon dari Supabase:", err);
      }
    };

    updateFavicon();
  }, []);
  // ============================================

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;