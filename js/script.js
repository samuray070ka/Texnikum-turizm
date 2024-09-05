document.addEventListener('DOMContentLoaded', function () {
    // URL'dan blog ID ni olish
    const path = window.location.pathname;
    const blogId = path.split('/').pop(); // So'nggi segmentni olish (ID)

    if (blogId) {
        // API orqali blog ma'lumotlarini olish
        fetch(`https://your-api-endpoint.com/api/v1/blog/${blogId}`)
            .then(response => response.json())
            .then(data => {
                displayBlogDetails(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        document.getElementById('blog-details').innerHTML = '<p>Blog topilmadi</p>';
    }
});

// Blog ma'lumotlarini sahifada ko'rsatish funksiyasi
function displayBlogDetails(blog) {
    const blogDetailsDiv = document.getElementById('blog-details');

    blogDetailsDiv.innerHTML = `
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
        <p>Muallif: ${blog.author}</p>
        <p>Sana: ${blog.date}</p>
    `;
}
