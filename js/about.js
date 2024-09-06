document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://collegeproject1211.pythonanywhere.com/aboutpage/'; // Replace with your API endpoint

    // Get the default language from localStorage or fallback to 'uz'
    let currentLang = localStorage.getItem('selectedLang') || 'uz';

    // Function to fetch data from the API
    async function fetchData() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        populateAbout(data.about);
        populatePartners(data.partners);
    }

    // Function to populate the About section
    function populateAbout(aboutItems) {
        const aboutContainer = document.getElementById('about-items');
        aboutContainer.innerHTML = ''; // Clear previous content
        aboutItems.forEach(item => {
            const aboutItem = document.createElement('div');
            aboutItem.className = 'col-xl-6 col-lg-6 col-md-12 col-sm-12';
            aboutItem.innerHTML = `
                <div class="post-media wow fadeIn">
                    <img src="${item.image_url}" alt="" class="img-fluid img-rounded" style="width: 400px; height: 400px;">
                </div>
                <div class="message-box">
                    <h4>${item.title[currentLang] || item.title.uz}</h4>
                    <p>${item.description[currentLang] || item.description.uz}</p>
                    <a href="blog-single.html" class="hover-btn-new orange"><span>${item.button_text || 'Learn More'}</span></a>
                </div>
            `;
            aboutContainer.appendChild(aboutItem);
        });
    }

    // Function to populate partners section
    function populatePartners(partners) {
        const partnersContainer = document.getElementById('partners');
        if (!partnersContainer) return;

        partnersContainer.innerHTML = ''; // Clear previous content
        partners.forEach(partner => {
            const partnerItem = document.createElement('div');
            partnerItem.className = 'col-lg-2 col-md-2 col-sm-4 col-xs-6';
            partnerItem.innerHTML = `
                <img src="${partner.icon_url}" alt="${partner.name[currentLang] || partner.name.uz}" class="img-fluid" style="width: 100px; height: 100px;">
            `;
            partnersContainer.appendChild(partnerItem);
        });
    }

    // Function to update static text on the page based on the language
    function updateStaticText() {
        document.querySelectorAll('[data-lang-uz]').forEach(element => {
            const text = element.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    // Handle language switching
    document.querySelectorAll('.language-switcher').forEach(langSwitcher => {
        langSwitcher.addEventListener('click', function() {
            currentLang = this.getAttribute('data-lang');
            
            // Save the selected language to localStorage
            localStorage.setItem('selectedLang', currentLang);

            // Clear existing content and refetch data in the selected language
            document.getElementById('about-items').innerHTML = '';
            document.getElementById('partners').innerHTML = '';
            fetchData();

            // Update static text based on the selected language
            updateStaticText();
        });
    });

    // Fetch data and update static text on page load
    fetchData();
    updateStaticText();
});
