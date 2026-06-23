function search() {
  const query = document.getElementById('q').value;
  
  fetch(`/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.textContent = ''; 

      data.forEach(item => {
        const linkElement = document.createElement('a');
        let safeLink = 'javascript:void(0)'; 

        try {
          const parsedUrl = new URL(item.link, window.location.origin);
          
          const isHttp = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
          const isSameOrigin = parsedUrl.origin === window.location.origin;

          if (isHttp && isSameOrigin) {
            safeLink = parsedUrl.href;
          }
        } catch (e) {
         
          if (item.link.startsWith('/') && !item.link.startsWith('//')) {
            safeLink = item.link;
          }
        }

        linkElement.href = safeLink;
        
        linkElement.textContent = item.title; 
        
        resultsContainer.appendChild(linkElement);
        resultsContainer.appendChild(document.createElement('br'));
      });
    })
    .catch(err => {
      console.error('Search failed:', err);
    });
}
