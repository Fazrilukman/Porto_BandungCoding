import { supabase } from '../supabase';

// ============================================
// PROJECTS CRUD
// ============================================

/**
 * Fetch all projects from Supabase
 */
export async function fetchProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { data: null, error };
  }
}

/**
 * Create new project
 */
export async function createProject(projectData) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating project:', error);
    return { data: null, error };
  }
}

/**
 * Update existing project
 */
export async function updateProject(id, projectData) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating project:', error);
    return { data: null, error };
  }
}

/**
 * Delete project
 */
export async function deleteProject(id) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { error };
  }
}

// ============================================
// BLOGS CRUD
// ============================================

/**
 * Fetch all published blogs
 */
export async function fetchBlogs(publishedOnly = true) {
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { data: null, error };
  }
}

/**
 * Create new blog
 */
export async function createBlog(blogData) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating blog:', error);
    return { data: null, error };
  }
}

/**
 * Update existing blog
 */
export async function updateBlog(id, blogData) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update(blogData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { data: null, error };
  }
}

/**
 * Delete blog
 */
export async function deleteBlog(id) {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { error };
  }
}

// ============================================
// CONTACTS CRUD
// ============================================

/**
 * Submit contact form
 */
export async function submitContact(contactData) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { data: null, error };
  }
}

/**
 * Fetch all contacts (Admin only)
 */
export async function fetchContacts() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return { data: null, error };
  }
}

// ============================================
// TECHNOLOGIES CRUD
// ============================================

/**
 * Fetch all technologies
 */
export async function fetchTechnologies() {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return { data: null, error };
  }
}

// ============================================
// SITE SETTINGS
// ============================================

/**
 * Fetch site settings
 */
export async function fetchSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) throw error;
    
    // Convert array to object for easier access
    const settings = {};
    data.forEach(item => {
      settings[item.key] = item.value;
    });
    
    return { data: settings, error: null };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return { data: null, error };
  }
}

/**
 * Update site setting
 */
export async function updateSiteSetting(key, value) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ value, updated_at: new Date() })
      .eq('key', key)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating site setting:', error);
    return { data: null, error };
  }
}

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to projects changes
 */
export function subscribeToProjects(callback) {
  const channel = supabase
    .channel('projects-changes')
    .on(
      'postgres_changes', 
      { event: '*', schema: 'public', table: 'projects' },
      callback
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

/**
 * Subscribe to blogs changes
 */
export function subscribeToBlogs(callback) {
  const channel = supabase
    .channel('blogs-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'blogs' },
      callback
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

// ============================================
// MIGRATION HELPERS
// ============================================

/**
 * Migrate data from localStorage to Supabase
 */
export async function migrateFromLocalStorage() {
  try {
    console.log('🔄 Starting migration from localStorage to Supabase...');

    // 1. Migrate projects
    const savedProjects = localStorage.getItem('supercode_projects');
    if (savedProjects) {
      const projects = JSON.parse(savedProjects);
      console.log(`📦 Found ${projects.length} projects in localStorage`);

      for (const project of projects) {
        // Convert localStorage format to Supabase format
        const projectData = {
          name: project.name || project.title,
          title: project.title || project.name,
          description: project.description,
          image: project.image,
          tech_stack: project.techStack || [],
          link: project.link || '',
          github_url: project.Github || 'Private',
          category: project.category || 'Web Development',
          featured: project.featured !== undefined ? project.featured : true,
          order_index: project.id || 0
        };

        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) {
          console.error('Error migrating project:', error);
        } else {
          console.log(`✅ Migrated: ${projectData.name}`);
        }
      }
    }

    // 2. Migrate blogs
    const savedBlogs = localStorage.getItem('bandungcoding_blogs');
    if (savedBlogs) {
      const blogs = JSON.parse(savedBlogs);
      console.log(`📝 Found ${blogs.length} blogs in localStorage`);

      for (const blog of blogs) {
        const blogData = {
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          excerpt: blog.excerpt,
          image: blog.image,
          category: blog.category,
          tags: blog.tags || [],
          published: true,
          published_at: new Date()
        };

        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) {
          console.error('Error migrating blog:', error);
        } else {
          console.log(`✅ Migrated: ${blogData.title}`);
        }
      }
    }

    console.log('🎉 Migration complete!');
    return { success: true };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error };
  }
}
