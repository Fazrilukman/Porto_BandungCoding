import React, { useEffect, useState } from "react";
import { Code, ArrowLeft, ExternalLink, Search } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function AllProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
    });

    // Load projects from localStorage
    const savedProjects = localStorage.getItem('supercode_projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      setFilteredProjects(parsedProjects);
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Filter projects based on search term
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => {
        const title = project.name || project.title || '';
        const description = project.description || '';
        const techStack = Array.isArray(project.techStack) 
          ? project.techStack.join(' ') 
          : (project.technologies || '');
        
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               techStack.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredProjects(filtered);
    }
  }, [searchTerm, projects]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      
      <div className="md:px-[10%] px-[5%] py-24">
        {/* Header Section */}
        <div className="mb-12" data-aos="fade-down">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-3">
                All Projects
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                Explore all our projects and innovations ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20" data-aos="fade-up">
            <Code size={64} className="mx-auto mb-4 text-purple-400 opacity-50" />
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {searchTerm ? `No projects found for "${searchTerm}"` : 'No projects available yet'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-purple-400 hover:text-purple-300 underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id || index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group"
              >
                <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
                  {/* Project Image */}
                  {(project.image || project.Img) && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image || project.Img} 
                        alt={project.name || project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {e.target.src = 'https://placehold.co/400x300?text=No+Image'}}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {/* Project Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {project.name || project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(project.techStack) 
                          ? project.techStack 
                          : (project.technologies || '').split(',')
                        ).slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20"
                          >
                            {typeof tech === 'string' ? tech.trim() : tech}
                          </span>
                        ))}
                        {((Array.isArray(project.techStack) ? project.techStack.length : (project.technologies || '').split(',').length) > 4) && (
                          <span className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
                            +{(Array.isArray(project.techStack) ? project.techStack.length : (project.technologies || '').split(',').length) - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => navigate(`/project/${project.id}`)}
                        className="flex-1 px-4 py-2 text-sm text-white bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium shadow-md"
                      >
                        View Details
                      </button>
                      
                      {(project.link || project.Link) && (project.link || project.Link).trim() !== '' && (
                        <a 
                          href={project.link || project.Link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 flex items-center gap-1 group/link"
                        >
                          <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Top Button */}
        {filteredProjects.length > 6 && (
          <div className="mt-12 flex justify-center" data-aos="fade-up">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 text-gray-700 dark:text-white text-sm font-medium bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 hover:border-purple-500 dark:hover:border-purple-500/30 transition-all duration-300 flex items-center gap-2 shadow-md dark:shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6"/>
              </svg>
              Back to Top
            </button>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
