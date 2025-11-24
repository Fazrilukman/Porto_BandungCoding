import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Search, Tag, Calendar } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function AllBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
    });

    const savedBlogs = localStorage.getItem('bandungcoding_blogs');
    if (savedBlogs) {
      const parsedBlogs = JSON.parse(savedBlogs);
      setBlogs(parsedBlogs);
      setFilteredBlogs(parsedBlogs);
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBlogs(blogs);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = blogs.filter((blog) => {
      const title = blog.title || '';
      const excerpt = blog.excerpt || '';
      const tags = Array.isArray(blog.tags) ? blog.tags.join(' ') : '';
      return (
        title.toLowerCase().includes(term) ||
        excerpt.toLowerCase().includes(term) ||
        tags.toLowerCase().includes(term)
      );
    });

    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  return (
    <div className="min-h-screen bg-[#030014]">
      <Navbar />

      <div className="md:px-[10%] px-[5%] py-24">
        {/* Header */}
        <div className="mb-12" data-aos="fade-down">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-3">
                All Blogs
              </h1>
              <p className="text-slate-400 text-sm md:text-base">
                Discover our latest insights and stories ({filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'})
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20" data-aos="fade-up">
            <BookOpen size={64} className="mx-auto mb-4 text-purple-400 opacity-50" />
            <p className="text-slate-400 text-lg">
              {searchTerm ? `Tidak ada artikel untuk "${searchTerm}"` : 'Belum ada artikel tersedia'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-purple-400 hover:text-purple-300 underline"
              >
                Bersihkan pencarian
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id || index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group h-full"
              >
                <div
                  className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col cursor-pointer"
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  {blog.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-semibold flex items-center gap-2">
                        <Tag className="w-3 h-3" />
                        {blog.category}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 4 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            +{blog.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-white/5">
                      <button className="flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors">
                        Baca Selengkapnya
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBlogs.length > 6 && (
          <div className="mt-12 flex justify-center" data-aos="fade-up">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 text-white text-sm font-medium bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 flex items-center gap-2"
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
                <path d="m18 15-6-6-6 6" />
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
