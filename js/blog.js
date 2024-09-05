document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://collegeproject1211.pythonanywhere.com/blogpage/'; // Replace with your API endpoint
    
    // Check if a language is stored in localStorage, otherwise default to 'uz'
    let currentLang = localStorage.getItem('selectedLang') || 'uz'; 

    // Function to fetch data from the API
    async function fetchData() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        populateBlog(data.blog);
        populatePartners(data.partners);
    }

    // Function to populate blog section
    function populateBlog(blogItems) {
        const blogContainer = document.getElementById('blog-items');
        blogContainer.innerHTML = ''; // Clear existing content

        blogItems.forEach(item => {
            const blogItem = document.createElement('div');
            blogItem.className = 'col-lg-4 col-md-6 col-12';
            blogItem.innerHTML = `
                <div class="blog-item">
                    <div class="image-blog">
                        <img src="${item.image_url}" alt="" class="img-fluid">
                    </div>
                    <div class="meta-info-blog">
                        <span><i class="fa fa-calendar"></i> <a href="#">${new Date(item.created_at).toLocaleDateString()}</a></span>
                        <span><i class="fa fa-tag"></i> <a href="#">${item.category}</a></span>
                        <span><i class="fa fa-comments"></i> <a href="#">0 Comments</a></span>
                    </div>
                    <div class="blog-title">
                        <h2><a href="#" title="">${item.title[currentLang] || item.title.uz}</a></h2>
                    </div>
                    <div class="blog-desc">
                        <p>${item.description[currentLang] || item.description.uz}</p>
                    </div>
                    <div class="blog-button">
                        <a class="hover-btn-new orange" href="blog-single.html"><span>Read More<span></a>
                    </div>
                </div>
            `;
            blogContainer.appendChild(blogItem);
        });
    }

    function populatePartners(partners) {
        console.log('Populating partners:', partners);
        const partnersContainer = document.getElementById('partners');
        if (!partnersContainer) return;
        
        partners.forEach(partner => {
            console.log('Partner item:', partner);
            const partnerItem = document.createElement('div');
            partnerItem.className = 'col-lg-2 col-md-2 col-sm-4 col-xs-6';
            partnerItem.innerHTML = `
              <img src="${partner.icon_url}" alt="${partner.name.uz}" class="img-fluid" style="width: 100px; height: 100px;">
            `;
            partnersContainer.appendChild(partnerItem);
        });
    }
    
    // Handle language switching
    document.querySelectorAll('.language-switcher').forEach(langSwitcher => {
        langSwitcher.addEventListener('click', function() {
            currentLang = this.getAttribute('data-lang');
            localStorage.setItem('selectedLang', currentLang); // Store selected language in localStorage
            fetchData(); // Refetch data to update content
        });
    });

    // Fetch data on page load
    fetchData();
});
