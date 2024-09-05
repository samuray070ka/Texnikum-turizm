document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://collegeproject1211.pythonanywhere.com/homepage/'; // Replace with your API endpoint
  let currentLang = localStorage.getItem('selectedLang') || 'uz'; // Default language or saved language
  
  // Function to fetch data from the API
  async function fetchData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      populateSlider(data.sliders);
      populateAbout(data.about);
      populateHistory(data.our_history);
      populateResults(data.results);
      populatePartners(data.partners);
  }

  // Function to populate slider
  function populateSlider(sliders) {
      const indicators = document.getElementById('carousel-indicators');
      const inner = document.getElementById('carousel-inner');

      sliders.forEach((slider, index) => {
          // Add indicator
          const indicator = document.createElement('li');
          indicator.setAttribute('data-target', '#carouselExampleControls');
          indicator.setAttribute('data-slide-to', index);
          if (index === 0) indicator.classList.add('active');
          indicators.appendChild(indicator);

          // Add slide with background image and overlay content
          const item = document.createElement('div');
          item.className = 'carousel-item';
          if (index === 0) item.classList.add('active');
          item.style.backgroundImage = `url(${slider.image_url})`;
          item.style.backgroundSize = 'cover';
          item.style.backgroundPosition = 'center';
          item.style.height = '100vh';
          item.style.position = 'relative';

          item.innerHTML = `
              <div class="slider-overlay"> <!-- Overlay block -->
                  <div class="container">
                      <div class="row">
                          <div class="col-md-12 col-sm-12 text-left">
                              <div class="big-tagline">
                                  <h2>${slider.title[currentLang] || slider.title.uz}</h2>
                                  <p class="lead">${slider.description[currentLang] || slider.description.uz}</p>
                                  <a href="blog-single.html" class="hover-btn-new sa"><span>${slider.button_text || 'Read More'}</span></a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          `;
          inner.appendChild(item);
      });
  }

 // Function to populate about section
function populateAbout(aboutItems) {
  const aboutContainer = document.getElementById('about-items');
  aboutItems.forEach(item => {
      const aboutItem = document.createElement('div');
      aboutItem.className = 'about-item'; // Add a class for styling
      aboutItem.innerHTML = `
          <div class="post-media wow fadeIn">
              <img src="${item.image_url}" alt="" class="img-fluid img-rounded">
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


  // Function to populate history section
  function populateHistory(historyItems) {
    const historyContainer = document.getElementById('history');
    historyItems.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'timeline__item';
        historyItem.innerHTML = `
            <div class="timeline__content">
                <h2>${item.history_year}</h2>
                <p>${item.description[currentLang] || item.description.uz}</p>
                <img src="${item.image_url}" alt="">
            </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}


  // Function to populate results section
  function populateResults(results) {
      const resultsContainer = document.getElementById('results');
      if (!resultsContainer) return;

      results.forEach(result => {
          const resultItem = document.createElement('div');
          resultItem.className = 'col-lg-3 col-md-6 col-sm-6 col-xs-12';
          const title = result.title ? result.title[currentLang] || result.title.uz : "";
          resultItem.innerHTML = `
              <div class="stat-wrap">
                  <span class="global-radius"><i class="fa ${result.icon_url}"></i></span>
                  <p class="stat-count">${result.amount}</p>
                  <h3>${result.name.uz}</h3>
              </div>
          `;
          resultsContainer.appendChild(resultItem);
      });
  }

  // Function to populate partners section
  function populatePartners(partners) {
      const partnersContainer = document.getElementById('partners');
      if (!partnersContainer) return;

      partners.forEach(partner => {
          const partnerItem = document.createElement('div');
          partnerItem.className = 'col-lg-2 col-md-2 col-sm-4 col-xs-6';
          partnerItem.innerHTML = `
              <img src="${partner.icon_url}" alt="${partner.name.uz}" class="img-fluid" style="width: 100px; height: 100px;">
          `;
          partnersContainer.appendChild(partnerItem);
      });
  }

  // Handle language switching and save to localStorage
  document.querySelectorAll('.language-switcher').forEach(langSwitcher => {
      langSwitcher.addEventListener('click', function() {
          currentLang = this.getAttribute('data-lang');
          localStorage.setItem('selectedLang', currentLang); // Save selected language to localStorage
          document.getElementById('carousel-indicators').innerHTML = '';
          document.getElementById('carousel-inner').innerHTML = '';
          document.getElementById('about-items').innerHTML = '';
          document.getElementById('history').innerHTML = '';
          document.getElementById('results').innerHTML = '';
          document.getElementById('partners').innerHTML = '';
          fetchData();
      });
  });

  // Fetch data on page load
  fetchData();
});
