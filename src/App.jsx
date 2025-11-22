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

const LandingPage = () => {
  useEffect(() => {
    // Reset scroll to top on initial load
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
    // Clear any hash in URL on initial load
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    // Ensure page starts at top
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Ini route 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;