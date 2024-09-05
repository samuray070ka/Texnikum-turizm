document.addEventListener('DOMContentLoaded', () => {
    const teacherContainer = document.querySelector('#teachers .row');
    const partnersContainer = document.querySelector('#partners');

    let lang = localStorage.getItem('selectedLang') || 'uz'; // Default to 'uz' if no language is set

    // Fetch teacher and partner data from the API
    fetch('https://collegeproject1211.pythonanywhere.com/teacherpage/') // Use the actual API endpoint for fetching data
        .then(response => response.json())
        .then(data => {
            // Clear the existing content
            teacherContainer.innerHTML = '';
            partnersContainer.innerHTML = '';

            // Display teachers
            const teachers = data.teacher;
            teachers.forEach(teacher => {
                const teacherCard = `
                    <div class="col-lg-3 col-md-6 col-12">
                        <div class="our-team">
                            <div class="team-img">
                                <img src="${teacher.image_url}" alt="Teacher Image">
                                <div class="social">
                                    <ul>
                                        <li><a href="${teacher.link.facebook}" class="fa fa-facebook"></a></li>
                                        <li><a href="${teacher.link.twitter}" class="fa fa-twitter"></a></li>
                                        <li><a href="${teacher.link.linkedin}" class="fa fa-linkedin"></a></li>
                                        <li><a href="${teacher.link.skype}" class="fa fa-skype"></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="team-content">
                                <h3 class="title">${teacher.name[lang]}</h3>
                                <span class="post">${teacher.direction[lang]}</span>
                            </div>
                        </div>
                    </div>
                `;
                teacherContainer.innerHTML += teacherCard;
            });

            // Display partners
            const partners = data.partners;
            partners.forEach(partner => {
                const partnerLogo = `
                    <div class="col-lg-3 col-md-6 col-12">
                        <div class="partner-logo">
                            <a href="${partner.link}">
                                <img src="${partner.icon_url}" alt="Partner Logo">
                                <p>${partner.name[lang]}</p>
                            </a>
                        </div>
                    </div>
                `;
                partnersContainer.innerHTML += partnerLogo;
            });
        })
        .catch(error => {
            console.error('Error fetching teachers and partners:', error);
        });
});





document.querySelectorAll('.language-switcher').forEach(item => {
    item.addEventListener('click', (e) => {
        const selectedLang = e.target.getAttribute('data-lang');
        localStorage.setItem('selectedLang', selectedLang); // Save the selected language to localStorage
        location.reload(); // Reload the page to apply the new language
    });
});