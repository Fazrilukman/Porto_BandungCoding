import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ title, excerpt, image, category, date, slug }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group relative bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
      data-aos="fade-up"
      onClick={() => navigate(`/blog/${slug}`)}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#030014] via-transparent to-transparent z-10" />
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-semibold">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Read More Link */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/5">
          <button className="group/btn flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent hover:gap-3 transition-all duration-300">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/0 to-[#a855f7]/0 group-hover:from-[#6366f1]/5 group-hover:to-[#a855f7]/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default BlogCard;
