import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AnimatedBackground from '../components/Background';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    loadArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  const loadArticle = () => {
    const savedBlogs = localStorage.getItem('bandungcoding_blogs');
    if (savedBlogs) {
      const blogs = JSON.parse(savedBlogs);
      const currentArticle = blogs.find(b => b.slug === slug);
      
      if (currentArticle) {
        setArticle(currentArticle);
        
        // Get related articles (same category, exclude current)
        const related = blogs
          .filter(b => b.category === currentArticle.category && b.slug !== slug)
          .slice(0, 3);
        setRelatedArticles(related);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const shareArticle = (platform) => {
    const url = window.location.href;
    const text = article.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AnimatedBackground />
      
      <div className="min-h-screen bg-[#030014] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Blog</span>
          </button>

          {/* Article Header */}
          <div className="mb-8 space-y-6">
            {/* Category & Date */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full text-white text-sm font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {article.category}
              </span>
              <span className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {article.title}
            </h1>

            {/* Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Bagikan:
              </span>
              <button
                onClick={() => shareArticle('facebook')}
                className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5 text-blue-400" />
              </button>
              <button
                onClick={() => shareArticle('twitter')}
                className="p-2 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5 text-sky-400" />
              </button>
              <button
                onClick={() => shareArticle('linkedin')}
                className="p-2 bg-blue-700/20 hover:bg-blue-700/30 rounded-lg transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10">
              {/* Excerpt */}
              <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light italic border-l-4 border-purple-500 pl-6">
                {article.excerpt}
              </p>

              {/* Full Content */}
              <div 
                className="text-gray-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
              />
            </div>
          </div>

          {/* Tags Section */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8">Artikel Terkait</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/blog/${related.slug}`)}
                    className="group cursor-pointer bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all"
                  >
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-4">
                      <span className="text-xs text-purple-400 font-semibold">{related.category}</span>
                      <h3 className="text-white font-bold mt-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-2">{related.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 border border-purple-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Butuh Website Profesional?
            </h3>
            <p className="text-gray-300 mb-6">
              Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik!
            </p>
            <button
              onClick={() => navigate('/#Contact')}
              className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default BlogDetail;
