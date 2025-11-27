// Debug Helper untuk Portfolio
// Jalankan di Console untuk check data

console.log('%c=== PORTFOLIO DEBUG HELPER ===', 'color: #6366f1; font-size: 16px; font-weight: bold');

// 1. Check localStorage
const projects = localStorage.getItem('supercode_projects');
const carousel = localStorage.getItem('supercode_carousel');

console.log('📦 LocalStorage Status:');
console.log('- supercode_projects:', projects ? '✅ EXISTS' : '❌ NOT FOUND');
console.log('- supercode_carousel:', carousel ? '✅ EXISTS' : '❌ NOT FOUND');

if (projects) {
  const parsed = JSON.parse(projects);
  console.log('\n📊 Projects Data:');
  console.log('- Total projects:', parsed.length);
  console.log('- Projects:', parsed);
  
  parsed.forEach((p, i) => {
    console.log(`\nProject ${i + 1}:`);
    console.log('  - ID:', p.id);
    console.log('  - Title:', p.title || p.name);
    console.log('  - Image:', p.image ? '✅' : '❌');
    console.log('  - Image URL:', p.image?.substring(0, 50) + '...');
  });
}

// 2. Force reload
console.log('\n🔄 To force reload, run:');
console.log('location.reload(true)');

console.log('\n🗑️ To clear cache and reload:');
console.log('localStorage.clear(); location.reload(true)');
