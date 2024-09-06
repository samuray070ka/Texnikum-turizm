document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://collegeproject1211.pythonanywhere.com/coursepage/';

    // Function to fetch and display courses
    async function fetchAndDisplayCourses() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const courseContainer = document.getElementById('course-container');
            
            // Get the active language from localStorage or fallback to 'uz'
            const language = localStorage.getItem('selectedLang') || 'uz';

            // Clear the course container
            courseContainer.innerHTML = '';

            // Loop through the courses and populate the container
            data.course.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.className = 'col-lg-4 col-md-6 col-12';
                courseItem.innerHTML = `
                    <div class="course-item">
                        <div class="image-blog">
                            <img src="${course.image_url}" alt="" class="img-fluid">
                        </div>
                        <div class="course-br">
                            <div class="course-title">
                                <h2><a href="#" title="">${course.name[language] || course.name.uz}</a></h2>
                            </div>
                            <div class="course-desc">
                                <p>${course.description[language] || course.description.uz}</p>
                            </div>
                        </div>
                    </div>
                `;
                courseContainer.appendChild(courseItem);
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    // Fetch and display courses on page load
    fetchAndDisplayCourses();

    // Add event listeners to language switcher buttons
    document.querySelectorAll('.language-switcher').forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons and add to the clicked button
            document.querySelectorAll('.language-switcher').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get the selected language from the clicked button
            const selectedLang = this.getAttribute('data-lang');
            
            // Store the selected language in localStorage
            localStorage.setItem('selectedLang', selectedLang);
            
            // Re-fetch and display courses in the selected language
            fetchAndDisplayCourses();
        });
    });

    // On page load, set the active class on the correct language switcher
    const storedLanguage = localStorage.getItem('selectedLang') || 'uz';
    const activeLanguageSwitcher = document.querySelector(`.language-switcher[data-lang="${storedLanguage}"]`);
    if (activeLanguageSwitcher) {
        activeLanguageSwitcher.classList.add('active');
    }
});
