import React, { useEffect, useState } from 'react';
import { MessageCircle, Send, User, Clock } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

const Komentar = () => {
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });

    useEffect(() => {
        AOS.init({
            once: false,
            duration: 1000,
        });
        
        // Load comments from localStorage
        const savedComments = localStorage.getItem('supercode_comments');
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        const newComment = {
            id: Date.now(),
            name: formData.name,
            message: formData.message,
            timestamp: new Date().toISOString()
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        localStorage.setItem('supercode_comments', JSON.stringify(updatedComments));
        
        // Reset form
        setFormData({ name: '', message: '' });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // difference in seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <section 
            id="Contact"
            className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
        >
            <div className="absolute inset-0 bg-[#030014]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
            
            <div className="relative w-full max-w-4xl mx-auto">
                <div className="text-center mb-12" data-aos="fade-down">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                            <MessageCircle className="w-8 h-8 text-indigo-400" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-3">
                        Leave a Comment
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Share your thoughts and feedback with us
                    </p>
                </div>

                {/* Comment Form */}
                <div 
                    className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
                    data-aos="fade-up"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-slate-500"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Your Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="4"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-slate-500 resize-none"
                                placeholder="Write your comment..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:shadow-lg hover:shadow-purple-500/50 rounded-xl font-semibold text-white transition-all duration-300 shadow-md"
                        >
                            <Send size={20} />
                            Post Comment
                        </button>
                    </form>
                </div>

                {/* Comments List */}
                <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                    <h3 className="text-xl font-bold text-white mb-4">
                        Comments ({comments.length})
                    </h3>
                    
                    {comments.length === 0 ? (
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                            <p className="text-slate-400">No comments yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                            <User size={20} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-white">{comment.name}</h4>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Clock size={12} />
                                                {formatDate(comment.timestamp)}
                                            </div>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            {comment.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Komentar;
