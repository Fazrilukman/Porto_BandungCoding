# 📋 COMPLETE CODE REFERENCE - Copy & Paste Ready

Semua kode yang sudah diupdate untuk Supabase migration.

---

## 1. src/utils/supabaseHelpers.js

```javascript
import { supabase } from '../supabase';

// ==================== PROJECTS ====================

export async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (
          id,
          image_url,
          is_primary,
          display_order
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to match current format
    return data.map(project => ({
      id: project.id,
      name: project.name,
      title: project.title,
      description: project.description,
      category: project.category,
      techStack: project.tech_stack || [],
      technologies: project.technologies,
      link: project.demo_url,
      Link: project.demo_url,
      github: project.github_url,
      Github: project.github_url,
      image: project.thumbnail_url || (project.project_images?.[0]?.image_url),
      Img: project.thumbnail_url || (project.project_images?.[0]?.image_url),
      Images: project.project_images?.map(img => img.image_url) || [],
      features: project.features || [],
      Features: project.features || [],
      featured: project.is_featured || false,
      status: project.status,
      createdAt: project.created_at,
      updatedAt: project.updated_at
    }));
  } catch (error) {
    console.error('[Supabase] Error fetching projects:', error);
    return [];
  }
}

export async function getProjectById(projectId) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (
          id,
          image_url,
          is_primary,
          display_order
        )
      `)
      .eq('id', projectId)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      title: data.title,
      description: data.description,
      category: data.category,
      techStack: data.tech_stack || [],
      technologies: data.technologies,
      link: data.demo_url,
      Link: data.demo_url,
      github: data.github_url,
      Github: data.github_url,
      image: data.thumbnail_url || (data.project_images?.[0]?.image_url),
      Img: data.thumbnail_url || (data.project_images?.[0]?.image_url),
      Images: data.project_images?.map(img => img.image_url) || [],
      features: data.features || [],
      Features: data.features || [],
      featured: data.is_featured || false,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('[Supabase] Error fetching project:', error);
    return null;
  }
}

export async function createProject(projectData) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        name: projectData.name || projectData.title,
        title: projectData.title || projectData.name,
        description: projectData.description,
        thumbnail_url: projectData.image || projectData.Img,
        category: projectData.category,
        tech_stack: projectData.techStack || [],
        technologies: projectData.technologies,
        demo_url: projectData.link || projectData.Link,
        github_url: projectData.github || projectData.Github,
        features: projectData.features || projectData.Features || [],
        is_featured: projectData.featured || false,
        status: projectData.status || 'published'
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('[Supabase] Project created:', data);
    return data;
  } catch (error) {
    console.error('[Supabase] Error creating project:', error);
    throw error;
  }
}

export async function updateProject(projectId, updates) {
  try {
    const updateData = {
      name: updates.name || updates.title,
      title: updates.title || updates.name,
      description: updates.description,
      thumbnail_url: updates.image || updates.Img,
      category: updates.category,
      tech_stack: updates.techStack || [],
      technologies: updates.technologies,
      demo_url: updates.link || updates.Link,
      github_url: updates.github || updates.Github,
      features: updates.features || updates.Features || [],
      is_featured: updates.featured,
      status: updates.status,
      updated_at: new Date().toISOString()
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;

    console.log('[Supabase] Project updated:', data);
    return data;
  } catch (error) {
    console.error('[Supabase] Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(projectId) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;

    console.log('[Supabase] Project deleted:', projectId);
    return true;
  } catch (error) {
    console.error('[Supabase] Error deleting project:', error);
    throw error;
  }
}

// Real-time subscription for projects
export function subscribeToProjects(callback) {
  const subscription = supabase
    .channel('projects_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'projects'
      },
      async (payload) => {
        console.log('[Supabase] Project change detected:', payload);
        // Fetch all projects and call callback
        const projects = await fetchProjects();
        callback(projects);
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    subscription.unsubscribe();
  };
}

// ==================== BLOGS ====================

export async function getBlogs(limit = null) {
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(blog => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImage: blog.cover_image,
      author: blog.author,
      category: blog.category,
      tags: blog.tags || [],
      published: blog.is_published,
      views: blog.views_count,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at
    }));
  } catch (error) {
    console.error('[Supabase] Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(blogId) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.cover_image,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      published: data.is_published,
      views: data.views_count,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('[Supabase] Error fetching blog:', error);
    return null;
  }
}

export async function getBlogBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Increment views
    await supabase
      .from('blogs')
      .update({ views_count: (data.views_count || 0) + 1 })
      .eq('id', data.id);

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.cover_image,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      published: data.is_published,
      views: (data.views_count || 0) + 1,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('[Supabase] Error fetching blog by slug:', error);
    return null;
  }
}

export async function createBlog(blogData) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([{
        title: blogData.title,
        slug: blogData.slug || blogData.title.toLowerCase().replace(/\s+/g, '-'),
        content: blogData.content,
        excerpt: blogData.excerpt,
        cover_image: blogData.coverImage,
        author: blogData.author,
        category: blogData.category,
        tags: blogData.tags || [],
        is_published: blogData.published || false
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('[Supabase] Blog created:', data);
    return data;
  } catch (error) {
    console.error('[Supabase] Error creating blog:', error);
    throw error;
  }
}

export async function updateBlog(blogId, updates) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({
        title: updates.title,
        slug: updates.slug,
        content: updates.content,
        excerpt: updates.excerpt,
        cover_image: updates.coverImage,
        author: updates.author,
        category: updates.category,
        tags: updates.tags,
        is_published: updates.published,
        updated_at: new Date().toISOString()
      })
      .eq('id', blogId)
      .select()
      .single();

    if (error) throw error;

    console.log('[Supabase] Blog updated:', data);
    return data;
  } catch (error) {
    console.error('[Supabase] Error updating blog:', error);
    throw error;
  }
}

export async function deleteBlog(blogId) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogId);

    if (error) throw error;

    console.log('[Supabase] Blog deleted:', blogId);
    return true;
  } catch (error) {
    console.error('[Supabase] Error deleting blog:', error);
    throw error;
  }
}

// ==================== CONTACTS ====================

export async function createContact(contactData) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('[Supabase] Contact created:', data);
    return data;
  } catch (error) {
    console.error('[Supabase] Error creating contact:', error);
    throw error;
  }
}

export async function getContacts() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error fetching contacts:', error);
    return [];
  }
}

export async function updateContactStatus(contactId, status) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', contactId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error updating contact status:', error);
    throw error;
  }
}

// ==================== TECHNOLOGIES ====================

export async function getTechnologies() {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('name');

    if (error) throw error;

    return data.map(tech => ({
      id: tech.id,
      name: tech.name,
      icon: tech.icon_url,
      category: tech.category,
      proficiency: tech.proficiency_level
    }));
  } catch (error) {
    console.error('[Supabase] Error fetching technologies:', error);
    return [];
  }
}

export async function createTechnology(techData) {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .insert([{
        name: techData.name,
        icon_url: techData.icon,
        category: techData.category,
        proficiency_level: techData.proficiency || 50
      }])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error creating technology:', error);
    throw error;
  }
}

export async function updateTechnology(techId, updates) {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .update({
        name: updates.name,
        icon_url: updates.icon,
        category: updates.category,
        proficiency_level: updates.proficiency
      })
      .eq('id', techId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error updating technology:', error);
    throw error;
  }
}

export async function deleteTechnology(techId) {
  try {
    const { error } = await supabase
      .from('technologies')
      .delete()
      .eq('id', techId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('[Supabase] Error deleting technology:', error);
    throw error;
  }
}

// ==================== SERVICES ====================

export async function getServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error fetching services:', error);
    return [];
  }
}

export async function createService(serviceData) {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([{
        name: serviceData.name,
        description: serviceData.description,
        icon: serviceData.icon,
        features: serviceData.features || [],
        price_range: serviceData.priceRange,
        is_active: serviceData.isActive !== false
      }])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error creating service:', error);
    throw error;
  }
}

export async function updateService(serviceId, updates) {
  try {
    const { data, error } = await supabase
      .from('services')
      .update({
        name: updates.name,
        description: updates.description,
        icon: updates.icon,
        features: updates.features,
        price_range: updates.priceRange,
        is_active: updates.isActive,
        display_order: updates.displayOrder
      })
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error updating service:', error);
    throw error;
  }
}

export async function deleteService(serviceId) {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('[Supabase] Error deleting service:', error);
    throw error;
  }
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error fetching testimonials:', error);
    return [];
  }
}

export async function createTestimonial(testimonialData) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{
        client_name: testimonialData.clientName,
        client_company: testimonialData.clientCompany,
        client_position: testimonialData.clientPosition,
        client_photo: testimonialData.clientPhoto,
        rating: testimonialData.rating || 5,
        testimonial_text: testimonialData.text,
        project_name: testimonialData.projectName
      }])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error creating testimonial:', error);
    throw error;
  }
}

export async function updateTestimonial(testimonialId, updates) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .update({
        client_name: updates.clientName,
        client_company: updates.clientCompany,
        client_position: updates.clientPosition,
        client_photo: updates.clientPhoto,
        rating: updates.rating,
        testimonial_text: updates.text,
        project_name: updates.projectName,
        is_approved: updates.isApproved
      })
      .eq('id', testimonialId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error updating testimonial:', error);
    throw error;
  }
}

export async function deleteTestimonial(testimonialId) {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', testimonialId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('[Supabase] Error deleting testimonial:', error);
    throw error;
  }
}

// ==================== SITE SETTINGS ====================

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error fetching site settings:', error);
    return null;
  }
}

export async function updateSiteSetting(settingKey, value) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ [settingKey]: value })
      .eq('id', 1) // Assuming single row with id=1
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('[Supabase] Error updating site setting:', error);
    throw error;
  }
}
```

---

## 2. Admin.jsx - Key Changes

**SEBELUM:**
```javascript
const handleSaveProject = () => {
  const savedProjects = JSON.parse(localStorage.getItem('supercode_projects') || '[]');
  savedProjects.push(newProject);
  localStorage.setItem('supercode_projects', JSON.stringify(savedProjects));
};
```

**SEKARANG:**
```javascript
import { createProject, updateProject } from '../utils/supabaseHelpers';

const handleSaveProject = async () => {
  try {
    if (editingId) {
      // Update existing project
      await updateProject(editingId, formData);
      Swal.fire('Success!', 'Project updated successfully', 'success');
    } else {
      // Create new project
      await createProject(formData);
      Swal.fire('Success!', 'Project created successfully', 'success');
    }
    
    // Reset form
    setFormData({...initialState});
    setEditingId(null);
  } catch (error) {
    console.error('[Admin] Error saving project:', error);
    Swal.fire('Error!', 'Failed to save project', 'error');
  }
};
```

---

## 3. Portofolio.jsx - Key Changes

**SEBELUM:**
```javascript
const fetchData = () => {
  const savedProjects = localStorage.getItem('supercode_projects');
  if (savedProjects) {
    setProjects(JSON.parse(savedProjects));
  }
};

useEffect(() => {
  fetchData();
}, []);
```

**SEKARANG:**
```javascript
import { fetchProjects, subscribeToProjects } from '../utils/supabaseHelpers';

const fetchData = useCallback(async () => {
  try {
    const projectsData = await fetchProjects();
    setProjects(projectsData);
  } catch (error) {
    console.error('[Portofolio] Error:', error);
    setProjects([]);
  }
}, []);

useEffect(() => {
  fetchData();
  
  // Real-time subscription
  const unsubscribe = subscribeToProjects((newProjects) => {
    console.log('🔄 Projects updated:', newProjects.length);
    setProjects(newProjects);
  });
  
  return () => {
    if (unsubscribe) unsubscribe();
  };
}, [fetchData]);
```

---

## 4. AllProjects.jsx - Key Changes

**SEBELUM:**
```javascript
useEffect(() => {
  const savedProjects = localStorage.getItem('supercode_projects');
  if (savedProjects) {
    setProjects(JSON.parse(savedProjects));
  }
}, []);
```

**SEKARANG:**
```javascript
import { fetchProjects, subscribeToProjects } from '../utils/supabaseHelpers';

useEffect(() => {
  const loadProjects = async () => {
    try {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    } catch (error) {
      console.error('[AllProjects] Error:', error);
    }
  };

  loadProjects();

  // Real-time subscription
  const unsubscribe = subscribeToProjects((newProjects) => {
    setProjects(newProjects);
    setFilteredProjects(newProjects);
  });

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);
```

---

## 5. Testing Commands

### Test 1: Cek Koneksi Supabase
```javascript
// Di browser console
import { supabase } from './src/supabase';
const { data, error } = await supabase.from('projects').select('count');
console.log('Projects count:', data);
```

### Test 2: Tambah Project Manual
```javascript
import { createProject } from './src/utils/supabaseHelpers';

await createProject({
  name: 'Test Project',
  description: 'This is a test',
  image: 'https://placehold.co/400x300',
  techStack: ['React', 'Tailwind'],
  category: 'Web Development'
});
```

### Test 3: Fetch Projects
```javascript
import { fetchProjects } from './src/utils/supabaseHelpers';

const projects = await fetchProjects();
console.log('All projects:', projects);
```

---

## 6. Environment Variables

Pastikan file `.env` atau `.env.local` sudah benar:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Cara mendapatkan:**
1. Buka Supabase Dashboard
2. Pilih project Anda
3. Settings → API
4. Copy URL dan anon key

---

## 7. Common Issues & Solutions

### Issue: "Cannot read property 'from' of undefined"
**Solution:** Cek apakah `supabase.js` sudah di-import dengan benar
```javascript
import { supabase } from '../supabase';
console.log('Supabase client:', supabase);
```

### Issue: "Projects not showing"
**Solution:** Cek di Supabase Dashboard apakah data ada
1. Buka Table Editor
2. Lihat table `projects`
3. Pastikan ada data

### Issue: "Real-time not working"
**Solution:** Enable Realtime di Supabase
1. Database → Replication
2. Enable untuk table `projects`

---

## 8. Database Migration Script

Jika belum upload ke Supabase, jalankan script ini:

```sql
-- Run this in Supabase SQL Editor
-- Copy from SUPABASE_MIGRATION_SCRIPT.sql
```

---

**🎯 Semua kode sudah ready untuk copy-paste!**
**Tinggal upload database dan test!**
