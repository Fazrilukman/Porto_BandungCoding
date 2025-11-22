import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumber: '',
    apiKey: '',
    businessName: ''
  });
  
  // Form state for projects
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    link: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Form state for tech stack
  const [techForm, setTechForm] = useState({
    name: '',
    icon: '',
    category: ''
  });

  // Form state for carousel
  const [carouselForm, setCarouselForm] = useState({
    imageUrl: '',
    title: ''
  });

  // Form state for blog
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Artikel',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    slug: '',
    tags: []
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    loadData();
  }, []);

  const loadData = () => {
    // Load from localStorage
    const savedProjects = localStorage.getItem('supercode_projects');
    const savedTechStack = localStorage.getItem('supercode_techstack');
    const savedWhatsappConfig = localStorage.getItem('supercode_whatsapp');
    const savedCarousel = localStorage.getItem('supercode_carousel');
    const savedBlogs = localStorage.getItem('bandungcoding_blogs');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Default projects with better data
      const defaultProjects = [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'Modern e-commerce solution with payment integration',
          image: 'https://cdn.dribbble.com/userupload/17496904/file/original-e3c1ae10e08d7bc7a05ab3a7b9b87984.png',
          technologies: 'React, Node.js, MongoDB',
          link: 'https://example.com'
        },
        {
          id: 2,
          title: 'Portfolio Website',
          description: 'Creative portfolio website with modern animations',
          image: 'https://cdn.dribbble.com/userupload/17378086/file/original-5aefd89fa494c6ed3e7c67c12c2d3ab5.png',
          technologies: 'React, Tailwind CSS, Vite',
          link: 'https://example.com'
        },
        {
          id: 3,
          title: 'Dashboard Analytics',
          description: 'Real-time analytics dashboard with data visualization',
          image: 'https://cdn.dribbble.com/userupload/17506288/file/original-142d73eb7da95ce3fb9dfbef7dcb2f59.png',
          technologies: 'React, Chart.js, Firebase',
          link: 'https://example.com'
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('supercode_projects', JSON.stringify(defaultProjects));
    }
    
    if (savedTechStack) {
      setTechStack(JSON.parse(savedTechStack));
    } else {
      // Default tech stack with emojis
      const defaultTechStack = [
        { id: 1, name: 'React', icon: '⚛️', category: 'Frontend' },
        { id: 2, name: 'Node.js', icon: '🟢', category: 'Backend' },
        { id: 3, name: 'MongoDB', icon: '🍃', category: 'Database' },
        { id: 4, name: 'Tailwind CSS', icon: '🎨', category: 'Frontend' },
        { id: 5, name: 'Firebase', icon: '🔥', category: 'Backend' },
        { id: 6, name: 'Vite', icon: '⚡', category: 'Frontend' },
        { id: 7, name: 'JavaScript', icon: '📜', category: 'Frontend' },
        { id: 8, name: 'TypeScript', icon: '💙', category: 'Frontend' },
        { id: 9, name: 'MySQL', icon: '🐬', category: 'Database' },
        { id: 10, name: 'Git', icon: '🔀', category: 'DevOps' },
        { id: 11, name: 'Docker', icon: '🐳', category: 'DevOps' },
        { id: 12, name: 'Material UI', icon: '🎭', category: 'Frontend' }
      ];
      setTechStack(defaultTechStack);
      localStorage.setItem('supercode_techstack', JSON.stringify(defaultTechStack));
    }
    
    if (savedCarousel) {
      setCarouselImages(JSON.parse(savedCarousel));
    } else {
      const defaultCarousel = [
        { id: 1, imageUrl: 'https://cdn.dribbble.com/userupload/17496904/file/original-e3c1ae10e08d7bc7a05ab3a7b9b87984.png', title: 'Project 1' },
        { id: 2, imageUrl: 'https://cdn.dribbble.com/userupload/17378086/file/original-5aefd89fa494c6ed3e7c67c12c2d3ab5.png', title: 'Project 2' },
        { id: 3, imageUrl: 'https://cdn.dribbble.com/userupload/17506288/file/original-142d73eb7da95ce3fb9dfbef7dcb2f59.png', title: 'Project 3' },
        { id: 4, imageUrl: 'https://cdn.dribbble.com/userupload/17420813/file/original-a22e0cf1df2f5e6ee1f0c1b67a0e3975.png', title: 'Project 4' },
        { id: 5, imageUrl: 'https://cdn.dribbble.com/userupload/17500575/file/original-2c91254bd5bef2b5ee4e75ed9bd3ea0e.png', title: 'Project 5' },
        { id: 6, imageUrl: 'https://cdn.dribbble.com/userupload/17436821/file/original-0b2783b2caeda60394f1cd51c0d3c1fc.png', title: 'Project 6' },
        { id: 7, imageUrl: 'https://cdn.dribbble.com/userupload/17489234/file/original-3f8e9c7a7d5f1e8c9a6b2d3e4f5a6b7c.png', title: 'Project 7' },
        { id: 8, imageUrl: 'https://cdn.dribbble.com/userupload/17445678/file/original-8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a.png', title: 'Project 8' },
        { id: 9, imageUrl: 'https://cdn.dribbble.com/userupload/17467890/file/original-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.png', title: 'Project 9' },
        { id: 10, imageUrl: 'https://cdn.dribbble.com/userupload/17423456/file/original-7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b.png', title: 'Project 10' }
      ];
      setCarouselImages(defaultCarousel);
      localStorage.setItem('supercode_carousel', JSON.stringify(defaultCarousel));
    }
    
    if (savedWhatsappConfig) {
      setWhatsappConfig(JSON.parse(savedWhatsappConfig));
    } else {
      const defaultConfig = {
        phoneNumber: '6281234567890',
        apiKey: '',
        businessName: 'BandungCoding'
      };
      setWhatsappConfig(defaultConfig);
      localStorage.setItem('supercode_whatsapp', JSON.stringify(defaultConfig));
    }

    const savedComments = localStorage.getItem('supercode_comments');
    
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      const defaultBlogs = [
        {
          id: 1,
          title: 'Jasa Pembuatan Website Murah di Kota Bengkulu: Solusi Digital Terpercaya',
          excerpt: 'Ingin memiliki website profesional untuk bisnis di Kota Bengkulu tanpa harus keluar biaya besar? Kami hadir sebagai mitra digital yang siap membantu...',
          content: `
            <h2>Mengapa Bisnis di Bengkulu Memerlukan Website?</h2>
            <p>Di era digital saat ini, memiliki website bukan lagi sekadar pilihan, melainkan kebutuhan mutlak. Bagi bisnis di Bengkulu, website profesional dapat menjadi jembatan untuk menjangkau lebih banyak pelanggan, baik lokal maupun nasional. Dengan website, Anda bisa:</p>
            <ul>
              <li><strong>Meningkatkan Kredibilitas:</strong> Website memberikan kesan profesional dan terpercaya kepada calon pelanggan.</li>
              <li><strong>Memperluas Jangkauan Pasar:</strong> Tidak terbatas wilayah, bisnis Anda bisa dikenal hingga ke luar Bengkulu.</li>
              <li><strong>Meningkatkan Penjualan:</strong> Dengan fitur e-commerce atau katalog online, pelanggan dapat langsung melakukan pemesanan.</li>
              <li><strong>Menghemat Biaya Marketing:</strong> Website adalah platform marketing yang efektif dan hemat biaya dibanding iklan konvensional.</li>
            </ul>

            <h2>Keunggulan Jasa Pembuatan Website Sevenlight</h2>
            <p>Sebagai penyedia jasa pembuatan website murah di Bengkulu, kami menawarkan berbagai keunggulan:</p>

            <h3>1. Harga Terjangkau</h3>
            <p>Kami memahami bahwa setiap bisnis memiliki budget yang berbeda. Oleh karena itu, kami menawarkan paket-paket yang fleksibel dan terjangkau tanpa mengurangi kualitas.</p>

            <h3>2. Design Profesional & SEO-Friendly</h3>
            <p>Setiap website yang kami buat dirancang dengan tampilan modern, responsif, dan dioptimalkan untuk mesin pencari (SEO) agar website Anda mudah ditemukan di Google.</p>

            <h3>3. Support & Maintenance</h3>
            <p>Kami tidak hanya membuat website, tetapi juga memberikan dukungan teknis dan maintenance untuk memastikan website Anda selalu berjalan dengan baik.</p>

            <h2>Jenis Website yang Bisa Kami Buat</h2>
            <ul>
              <li><strong>Website Company Profile:</strong> Untuk memperkenalkan bisnis Anda secara profesional</li>
              <li><strong>Website E-Commerce:</strong> Toko online lengkap dengan sistem pembayaran</li>
              <li><strong>Landing Page:</strong> Halaman khusus untuk kampanye marketing atau promosi</li>
              <li><strong>Website Portofolio:</strong> Showcase karya atau produk Anda</li>
              <li><strong>Website UMKM:</strong> Solusi terbaik untuk usaha kecil dan menengah</li>
            </ul>

            <h2>Call to Action (CTA)</h2>
            <p><strong>Jangan biarkan bisnis Anda tertinggal!</strong> Segera miliki website profesional untuk meningkatkan penjualan dan kredibilitas bisnis Anda. Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik!</p>
          `,
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
          content: `
            <h2>Mengapa UMKM di Pekanbaru Butuh Website?</h2>
            <p>Pekanbaru sebagai kota berkembang memiliki potensi bisnis yang sangat besar. UMKM yang ingin berkembang pesat memerlukan kehadiran digital yang kuat. Website memberikan berbagai manfaat:</p>
            <ul>
              <li>Meningkatkan visibilitas bisnis di era digital</li>
              <li>Memudahkan pelanggan menemukan produk/layanan Anda</li>
              <li>Meningkatkan kepercayaan konsumen</li>
              <li>Memperluas pasar hingga ke luar kota</li>
            </ul>

            <h2>Paket Website Terbaik untuk UMKM</h2>
            <p>Kami menyediakan berbagai paket yang disesuaikan dengan kebutuhan UMKM:</p>

            <h3>Paket Basic</h3>
            <p>Cocok untuk bisnis yang baru memulai digitalisasi. Termasuk company profile, kontak form, dan galeri produk.</p>

            <h3>Paket Professional</h3>
            <p>Untuk bisnis yang ingin tampil lebih profesional dengan fitur-fitur lengkap termasuk blog dan testimoni.</p>

            <h3>Paket E-Commerce</h3>
            <p>Solusi lengkap untuk toko online dengan sistem pembayaran dan manajemen produk.</p>

            <h2>Proses Pembuatan Website</h2>
            <ol>
              <li><strong>Konsultasi:</strong> Diskusi kebutuhan dan tujuan website Anda</li>
              <li><strong>Design:</strong> Pembuatan desain sesuai brand bisnis Anda</li>
              <li><strong>Development:</strong> Pengembangan website dengan teknologi terkini</li>
              <li><strong>Testing:</strong> Pengujian menyeluruh sebelum launching</li>
              <li><strong>Launching:</strong> Website siap online dan digunakan</li>
              <li><strong>Support:</strong> Dukungan berkelanjutan untuk maintenance</li>
            </ol>
          `,
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
          content: `
            <h2>Website Profesional untuk Bengkalis</h2>
            <p>Bengkalis memiliki banyak potensi bisnis yang perlu dikembangkan secara digital. Kami hadir untuk membantu pelaku usaha di Bengkalis memiliki website profesional dengan harga terjangkau.</p>

            <h2>Teknologi yang Kami Gunakan</h2>
            <ul>
              <li><strong>React.js:</strong> Framework modern untuk website yang cepat dan responsif</li>
              <li><strong>Node.js:</strong> Backend yang powerful dan scalable</li>
              <li><strong>Tailwind CSS:</strong> Design yang modern dan customizable</li>
              <li><strong>SEO Optimization:</strong> Website mudah ditemukan di Google</li>
            </ul>

            <h2>Fitur-Fitur Unggulan</h2>
            <ul>
              <li>✅ Responsive Design (Mobile-Friendly)</li>
              <li>✅ Loading Cepat</li>
              <li>✅ SEO Optimized</li>
              <li>✅ Keamanan SSL Certificate</li>
              <li>✅ Google Analytics Integration</li>
              <li>✅ WhatsApp Integration</li>
              <li>✅ Admin Panel</li>
              <li>✅ Free Maintenance (3 bulan)</li>
            </ul>

            <h2>Testimoni Klien</h2>
            <p><em>"Website yang dibuat sangat profesional dan sesuai dengan kebutuhan bisnis kami. Tim sangat responsif dan membantu. Highly recommended!"</em> - Budi, Owner Toko Online Bengkalis</p>

            <h2>Hubungi Kami Sekarang!</h2>
            <p>Jangan tunda lagi untuk memiliki website profesional. Konsultasi gratis dan dapatkan penawaran spesial untuk pelanggan dari Bengkalis!</p>
          `,
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

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments([]);
    }
  };

  const saveToLocalStorage = (type, data) => {
    if (type === 'projects') {
      localStorage.setItem('supercode_projects', JSON.stringify(data));
    } else {
      localStorage.setItem('supercode_techstack', JSON.stringify(data));
    }
  };

  // Project CRUD
  const handleAddProject = () => {
    setEditMode(false);
    setProjectForm({ title: '', description: '', image: '', technologies: '', link: '' });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditMode(true);
    setCurrentItem(project);
    setProjectForm(project);
    setImagePreview(project.image || '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProjectForm({ ...projectForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setProjectForm({ ...projectForm, image: '' });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveToLocalStorage('projects', updated);
    }
  };

  const handleSaveProject = () => {
    // Only validate title and description (the required fields)
    const title = projectForm.title || projectForm.name || '';
    const description = projectForm.description || '';
    
    if (!title.trim()) {
      alert('Please enter project title');
      return;
    }
    
    if (!description.trim()) {
      alert('Please enter project description');
      return;
    }

    const projectData = {
      id: editMode ? currentItem.id : Date.now(),
      name: title,
      title: title,
      description: description,
      image: imagePreview || projectForm.image || '',
      techStack: projectForm.technologies ? projectForm.technologies.split(',').map(t => t.trim()).filter(t => t) : [],
      link: projectForm.link || '',
      category: projectForm.category || 'Web Development',
      featured: projectForm.featured !== undefined ? projectForm.featured : true,
      Features: projectForm.Features || [],
      Github: projectForm.Github || 'Private'
    };

    if (editMode) {
      const updated = projects.map(p => p.id === currentItem.id ? projectData : p);
      setProjects(updated);
      saveToLocalStorage('projects', updated);
    } else {
      const updated = [...projects, projectData];
      setProjects(updated);
      saveToLocalStorage('projects', updated);
    }
    
    setShowModal(false);
    setProjectForm({ title: '', name: '', description: '', image: '', technologies: '', link: '', category: 'Web Development' });
    setImageFile(null);
    setImagePreview('');
  };

  // Tech Stack CRUD
  const handleAddTech = () => {
    setEditMode(false);
    setTechForm({ name: '', icon: '', category: '' });
    setShowModal(true);
  };

  const handleEditTech = (tech) => {
    setEditMode(true);
    setCurrentItem(tech);
    setTechForm(tech);
    setShowModal(true);
  };

  const handleDeleteTech = (id) => {
    if (window.confirm('Are you sure you want to delete this tech stack?')) {
      const updated = techStack.filter(t => t.id !== id);
      setTechStack(updated);
      saveToLocalStorage('techstack', updated);
    }
  };

  const handleSaveTech = () => {
    if (editMode) {
      const updated = techStack.map(t => t.id === currentItem.id ? { ...techForm, id: currentItem.id } : t);
      setTechStack(updated);
      saveToLocalStorage('techstack', updated);
    } else {
      const newTech = { ...techForm, id: Date.now() };
      const updated = [...techStack, newTech];
      setTechStack(updated);
      saveToLocalStorage('techstack', updated);
    }
    setShowModal(false);
    setTechForm({ name: '', icon: '', category: '' });
  };

  // Comments CRUD
  const handleDeleteComment = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      const updated = comments.filter(c => c.id !== id);
      setComments(updated);
      localStorage.setItem('supercode_comments', JSON.stringify(updated));
    }
  };

  const formatCommentDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // WhatsApp Config
  const handleSaveWhatsAppConfig = () => {
    if (!whatsappConfig.phoneNumber || !whatsappConfig.businessName) {
      alert('Please fill in phone number and business name');
      return;
    }
    localStorage.setItem('supercode_whatsapp', JSON.stringify(whatsappConfig));
    alert('WhatsApp configuration saved successfully!');
  };

  // Carousel CRUD
  const handleAddCarousel = () => {
    setEditMode(false);
    setCarouselForm({ imageUrl: '', title: '' });
    setImagePreview('');
    setImageFile(null);
    setShowModal(true);
  };

  const handleEditCarousel = (item) => {
    setEditMode(true);
    setCurrentItem(item);
    setCarouselForm(item);
    setImagePreview(item.imageUrl || '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleDeleteCarousel = (id) => {
    if (window.confirm('Are you sure you want to delete this carousel image?')) {
      const updated = carouselImages.filter(c => c.id !== id);
      setCarouselImages(updated);
      localStorage.setItem('supercode_carousel', JSON.stringify(updated));
    }
  };

  // Blog CRUD
  const handleAddBlog = () => {
    setEditMode(false);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: 'Artikel',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      slug: '',
      tags: []
    });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const handleEditBlog = (blog) => {
    setEditMode(true);
    setCurrentItem(blog);
    setBlogForm(blog);
    setImagePreview(blog.image || '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('bandungcoding_blogs', JSON.stringify(updated));
    }
  };

  const handleSaveBlog = async () => {
    let imageUrl = blogForm.image;
    
    if (imageFile) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(imageFile);
      });
    }

    const slug = blogForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (editMode) {
      const updated = blogs.map(b =>
        b.id === currentItem.id
          ? { ...blogForm, image: imageUrl, slug }
          : b
      );
      setBlogs(updated);
      localStorage.setItem('bandungcoding_blogs', JSON.stringify(updated));
    } else {
      const newBlog = {
        id: Date.now(),
        ...blogForm,
        image: imageUrl,
        slug
      };
      const updated = [...blogs, newBlog];
      setBlogs(updated);
      localStorage.setItem('bandungcoding_blogs', JSON.stringify(updated));
    }

    setShowModal(false);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: 'Artikel',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      slug: '',
      tags: []
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleSaveCarousel = () => {
    if (!carouselForm.imageUrl && !imagePreview) {
      alert('Please add an image URL or upload an image');
      return;
    }

    const finalImage = imagePreview || carouselForm.imageUrl;
    const carouselData = { ...carouselForm, imageUrl: finalImage };

    if (editMode) {
      const updated = carouselImages.map(c => c.id === currentItem.id ? { ...carouselData, id: currentItem.id } : c);
      setCarouselImages(updated);
      localStorage.setItem('supercode_carousel', JSON.stringify(updated));
    } else {
      const newCarousel = { ...carouselData, id: Date.now() };
      const updated = [...carouselImages, newCarousel];
      setCarouselImages(updated);
      localStorage.setItem('supercode_carousel', JSON.stringify(updated));
    }
    setShowModal(false);
    setCarouselForm({ imageUrl: '', title: '' });
    setImagePreview('');
    setImageFile(null);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">Manage your projects and tech stack</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap" data-aos="fade-up">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('carousel')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'carousel'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Latest Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'blog'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'comments'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Comments
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            WhatsApp API
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10" data-aos="fade-up">
          {/* Add Button */}
          {activeTab !== 'whatsapp' && activeTab !== 'comments' && (
            <div className="flex justify-end mb-6">
              <button
                onClick={
                  activeTab === 'projects' ? handleAddProject : 
                  activeTab === 'carousel' ? handleAddCarousel : 
                  handleAddBlog
                }
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Plus size={20} />
                Add {
                  activeTab === 'projects' ? 'Project' : 
                  activeTab === 'carousel' ? 'Carousel Image' : 
                  'Blog Article'
                }
              </button>
            </div>
          )}

          {/* Projects List */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {projects.length === 0 ? (
                <p className="text-center text-slate-400 py-8">No projects yet. Add your first project!</p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      {project.image && (
                        <img src={project.image} alt={project.title} className="w-24 h-24 rounded-lg object-cover" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-2">{project.description}</p>
                        <p className="text-purple-400 text-sm">Tech: {project.technologies}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Carousel List */}
          {activeTab === 'carousel' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carouselImages.length === 0 ? (
                <p className="col-span-full text-center text-slate-400 py-8">No carousel images yet. Add your first image!</p>
              ) : (
                carouselImages.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="relative h-48 bg-gray-800/50">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white truncate">{item.title || 'Untitled'}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCarousel(item)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCarousel(item.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* Blog List */}
          {activeTab === 'blog' && (
            <div className="space-y-4">
              {blogs.length === 0 ? (
                <p className="text-center text-slate-400 py-8">Belum ada artikel. Tambahkan artikel pertama Anda!</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      {blog.image && (
                        <img src={blog.image} alt={blog.title} className="w-32 h-24 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-300">
                                {blog.category}
                              </span>
                              <span className="text-xs text-slate-400">{blog.date}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>
                            <p className="text-slate-400 text-sm line-clamp-2">{blog.excerpt}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEditBlog(blog)}
                              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* Comments List */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-slate-400 py-8">Belum ada komentar.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{comment.name.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-white">{comment.name}</h3>
                              <span className="text-xs text-slate-400">{formatCommentDate(comment.timestamp)}</span>
                            </div>
                            <p className="text-slate-300 text-sm">{comment.message}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* WhatsApp Config */}
          {activeTab === 'whatsapp' && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-white">WhatsApp API Configuration</h3>
                <p className="text-slate-400 text-sm">Configure your WhatsApp number to receive order notifications</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Business Name</label>
                  <input
                    type="text"
                    value={whatsappConfig.businessName}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, businessName: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    placeholder="BandungCoding"
                  />
                  <p className="text-xs text-slate-500 mt-1">This will appear in WhatsApp messages</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">WhatsApp Number</label>
                  <input
                    type="text"
                    value={whatsappConfig.phoneNumber}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    placeholder="6281234567890"
                  />
                  <p className="text-xs text-slate-500 mt-1">Format: 62XXXXXXXXXX (without + or spaces)</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">API Key (Optional)</label>
                  <input
                    type="text"
                    value={whatsappConfig.apiKey}
                    onChange={(e) => setWhatsappConfig({ ...whatsappConfig, apiKey: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    placeholder="Your WhatsApp Business API Key"
                  />
                  <p className="text-xs text-slate-500 mt-1">For WhatsApp Business API integration (coming soon)</p>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">📱 How it works:</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Customers fill the order form on your website</li>
                    <li>• They click "Kirim via WhatsApp" button</li>
                    <li>• WhatsApp opens with pre-filled message</li>
                    <li>• Message is sent to the number configured here</li>
                  </ul>
                </div>
                
                <button
                  onClick={handleSaveWhatsAppConfig}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-semibold transition-all"
                >
                  <Save size={20} />
                  Save WhatsApp Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0a2e] rounded-2xl p-6 max-w-2xl w-full border border-purple-500/30 max-h-[90vh] overflow-y-auto" data-aos="zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editMode ? 'Edit' : 'Add'} {
                  activeTab === 'projects' ? 'Project' : 
                  activeTab === 'carousel' ? 'Carousel Image' : 
                  'Blog Article'
                }
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
                    rows="3"
                    placeholder="Enter project description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Project Image</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-10 h-10 mb-3 text-purple-400" />
                          <p className="mb-2 text-sm text-slate-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG, GIF up to 2MB</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
                    <div className="text-xs text-slate-500">
                      Or enter image URL manually:
                    </div>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => {
                        setProjectForm({ ...projectForm, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Technologies</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Project Link (Optional)</label>
                  <input
                    type="text"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            )}

            {activeTab === 'carousel' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Image Title *</label>
                  <input
                    type="text"
                    value={carouselForm.title}
                    onChange={(e) => setCarouselForm({ ...carouselForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Project 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Image *</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-10 h-10 mb-3 text-purple-400" />
                          <p className="mb-2 text-sm text-slate-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG, GIF up to 2MB</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
                    <div className="text-xs text-slate-500">
                      Or enter image URL manually:
                    </div>
                    <input
                      type="text"
                      value={carouselForm.imageUrl}
                      onChange={(e) => {
                        setCarouselForm({ ...carouselForm, imageUrl: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Judul Artikel *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    placeholder="Masukkan judul artikel"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Excerpt/Ringkasan *</label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    rows="3"
                    placeholder="Masukkan ringkasan artikel (akan ditampilkan di card)"
                  />
                  <p className="text-xs text-slate-500 mt-1">Ringkasan singkat untuk preview di halaman blog</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Konten Lengkap Artikel *</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white font-mono text-sm"
                    rows="12"
                    placeholder="Masukkan konten lengkap artikel dalam format HTML...&#10;&#10;Contoh:&#10;<h2>Judul Section</h2>&#10;<p>Paragraf pertama...</p>&#10;<ul>&#10;  <li>Item 1</li>&#10;  <li>Item 2</li>&#10;</ul>"
                  />
                  <p className="text-xs text-slate-500 mt-1">Gunakan HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Kategori</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                  >
                    <option value="Artikel">Artikel</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Tips">Tips</option>
                    <option value="Berita">Berita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Gambar Artikel</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-10 h-10 mb-3 text-purple-400" />
                          <p className="mb-2 text-sm text-slate-400">
                            <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG, GIF up to 2MB</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-white/10"></div>
                      <span className="text-xs text-slate-500">atau</span>
                      <div className="flex-1 h-px bg-white/10"></div>
                    </div>
                    
                    <input
                      type="url"
                      value={blogForm.image}
                      onChange={(e) => {
                        setBlogForm({ ...blogForm, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white text-sm"
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tanggal</label>
                  <input
                    type="text"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    placeholder="20 Nov 2024"
                  />
                  <p className="text-xs text-slate-500 mt-1">Format: DD MMM YYYY</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={blogForm.tags ? blogForm.tags.join(', ') : ''}
                    onChange={(e) => {
                      const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                      setBlogForm({ ...blogForm, tags: tagsArray });
                    }}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                    placeholder="Jasa Website, SEO, Bengkulu, Web Development"
                  />
                  <p className="text-xs text-slate-500 mt-1">Contoh: Jasa Website, SEO, Bengkulu (pisahkan dengan koma)</p>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={
                  activeTab === 'projects' ? handleSaveProject : 
                  activeTab === 'carousel' ? handleSaveCarousel : 
                  handleSaveBlog
                }
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Save size={20} />
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
