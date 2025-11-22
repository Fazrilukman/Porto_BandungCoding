import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import AOS from 'aos';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
    });
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const savedBlogs = localStorage.getItem('bandungcoding_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Default blogs
      const defaultBlogs = [
        {
          id: 1,
          title: 'Jasa Pembuatan Website Murah di Kota Bengkulu: Solusi Digital Terpercaya',
          excerpt: 'Ingin memiliki website profesional untuk bisnis di Kota Bengkulu tanpa harus keluar biaya besar? Kami hadir sebagai mitra digital yang siap membantu...',
          content: '<h2>Mengapa Bisnis di Bengkulu Memerlukan Website?</h2><p>Di era digital saat ini, memiliki website bukan lagi sekadar pilihan...</p>',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          category: 'Artikel',
          date: '20 Nov 2024',
          slug: 'jasa-website-bengkulu',
          tags: ['Jasa Website', 'Bengkulu', 'Website Murah', 'SEO']
        },
        {
          id: 2,
          title: 'Jasa Pembuatan Website Murah di Pekanbaru – Website Profesional untuk UMKM',
          excerpt: 'Sedang mencari jasa pembuatan website murah di Pekanbaru untuk mengembangkan usaha Anda? Sevenlight hadir membantu UMKM dan bisnis lokal...',
          content: '<h2>Mengapa UMKM di Pekanbaru Butuh Website?</h2><p>Pekanbaru sebagai kota berkembang memiliki potensi bisnis yang sangat besar...</p>',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
          category: 'Artikel',
          date: '19 Nov 2024',
          slug: 'jasa-website-pekanbaru',
          tags: ['Pekanbaru', 'UMKM', 'Website Profesional', 'E-Commerce']
        },
        {
          id: 3,
          title: 'Butuh Website Murah di Bengkalis? Pilih Jasa Pembuatan Website Profesional',
          excerpt: 'Sedang mencari jasa pembuatan website murah dan profesional di Bengkalis untuk mengembangkan usaha kamu? Sevenlight hadir untuk membantu...',
          content: '<h2>Website Profesional untuk Bengkalis</h2><p>Bengkalis memiliki banyak potensi bisnis yang perlu dikembangkan secara digital...</p>',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
          category: 'Artikel',
          date: '18 Nov 2024',
          slug: 'jasa-website-bengkalis',
          tags: ['Bengkalis', 'Website Murah', 'Teknologi', 'React']
        }
      ];
      setBlogs(defaultBlogs);
      localStorage.setItem('bandungcoding_blogs', JSON.stringify(defaultBlogs));
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] py-20 px-[5%] sm:px-[5%] lg:px-[10%]" id="Blog">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 border border-white/10">
            <Newspaper className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              Blog
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Artikel & Berita
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Temukan tips, panduan, dan insight terbaru seputar pengembangan website dan teknologi digital
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
              <Newspaper className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg">Belum ada artikel tersedia</p>
          </div>
        )}

        {/* SEO Benefits Section */}
        <div className="mt-20 pt-16 border-t border-white/5" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-white/10">
                <TrendingUp className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Meningkatkan SEO</h3>
              <p className="text-gray-400 text-sm">Konten berkualitas membantu website Anda lebih mudah ditemukan di mesin pencari</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-white/10">
                <Newspaper className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Konten Berkualitas</h3>
              <p className="text-gray-400 text-sm">Artikel informatif yang memberikan nilai tambah untuk pengunjung website Anda</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 border border-white/10">
                <TrendingUp className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Traffic Organik</h3>
              <p className="text-gray-400 text-sm">Tingkatkan pengunjung website melalui pencarian organik Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
