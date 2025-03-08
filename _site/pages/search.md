```markdown
---
layout: default
title: Search
permalink: /search/
---

<div class="search-container">
  <h1>Search</h1>
  <div class="search-box">
    <input type="text" id="search-input" placeholder="Search projects, skills, or blog posts..." autocomplete="off">
    <button id="search-clear" aria-label="Clear search"><i class="fas fa-times"></i></button>
  </div>
  
  <div class="search-results">
    <div id="search-results-container"></div>
  </div>
</div>

<script>
  // Initialize lunr with fetched data
  window.onload = function() {
    // Fetch the search data
    fetch('{{ "/search.json" | relative_url }}')
      .then(response => response.json())
      .then(data => {
        // Initialize lunr index
        const idx = lunr(function() {
          this.ref('id');
          this.field('title', { boost: 10 });
          this.field('content');
          this.field('tags', { boost: 5 });
          this.field('categories', { boost: 5 });
          
          // Add documents to index
          data.forEach(function(doc) {
            this.add(doc);
          }, this);
        });
        
        // Store the data for later use
        window.searchData = data;
        window.searchIndex = idx;
        
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
          document.getElementById('search-input').value = query;
          performSearch(query);
        }
      });
      
    // Set up event listeners
    document.getElementById('search-input').addEventListener('input', function() {
      performSearch(this.value);
    });
    
    document.getElementById('search-clear').addEventListener('click', function() {
      document.getElementById('search-input').value = '';
      document.getElementById('search-results-container').innerHTML = '';
    });
  };
  
  // Perform search with lunr
  function performSearch(query) {
    if (!query || query.length < 2) {
      document.getElementById('search-results-container').innerHTML = '';
      return;
    }
    
    // Update URL for sharing
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    window.history.replaceState({}, '', url);
    
    const results = window.searchIndex.search(query);
    const resultsContainer = document.getElementById('search-results-container');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
      return;
    }
    
    // Group results by type
    const groupedResults = {
      projects: [],
      posts: [],
      pages: []
    };
    
    results.forEach(function(result) {
      const item = window.searchData.find(d => d.id === result.ref);
      if (item) {
        groupedResults[item.type].push(item);
      }
    });
    
    // Build results HTML
    let resultsHTML = '';
    
    // Projects
    if (groupedResults.projects.length > 0) {
      resultsHTML += '<div class="result-group"><h2>Projects</h2>';
      groupedResults.projects.forEach(function(project) {
        resultsHTML += `
          <div class="search-result">
            <h3><a href="${project.url}">${project.title}</a></h3>
            <p>${project.summary}</p>
            <div class="result-meta">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
        `;
      });
      resultsHTML += '</div>';
    }
    
    // Blog posts
    if (groupedResults.posts.length > 0) {
      resultsHTML += '<div class="result-group"><h2>Blog Posts</h2>';
      groupedResults.posts.forEach(function(post) {
        resultsHTML += `
          <div class="search-result">
            <h3><a href="${post.url}">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <div class="result-meta">
              <span class="result-date">${post.date}</span>
              ${post.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
            </div>
          </div>
        `;
      });
      resultsHTML += '</div>';
    }
    
    // Pages
    if (groupedResults.pages.length > 0) {
      resultsHTML += '<div class="result-group"><h2>Pages</h2>';
      groupedResults.pages.forEach(function(page) {
        resultsHTML += `
          <div class="search-result">
            <h3><a href="${page.url}">${page.title}</a></h3>
            <p>${page.excerpt || ''}</p>
          </div>
        `;
      });
      resultsHTML += '</div>';
    }
    
    resultsContainer.innerHTML = resultsHTML;
  }
</script>
```