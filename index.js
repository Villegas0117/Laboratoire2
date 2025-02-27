const urlBlogs = "http://localhost:3000/blogs";
const urlComments = "http://localhost:3000/comments";

async function getDataCard() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const author = params.get("author");
    const date = params.get("date");

    const blogsCards = `${urlBlogs}?${title ? `title=${title}&` : ''}${author ? `author=${author}&` : ''}${date ? `date=${date}` : ''}`;
    
    console.log("URL generada:", blogsCards); 

    try {
        const response = await fetch(blogsCards); 
        const blogs = await response.json();
        console.log("Blogs obtenidos:", blogs); 

        // Card 
        const blogContainer = document.querySelector('.row'); 
        blogContainer.innerHTML = '';

        blogs.forEach(blog => {
            
            const card = document.createElement('div');
            card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'd-flex');
            card.innerHTML = `
                <div class="card shadow border mx-auto mt-3 first-card" role="cards">
                    <img class="card-img-top" src="./assets/1358647.png" alt="Card image cap" role="imgcard">
                    <div class="card-body">
                        <div class="container text-center my-4">
                            <a href="blog.html" class="btn fs-4" role="btnCard">${blog.title}</a>
                        </div>
                        <p class="card-text">Author: ${blog.author}</p>
                        <p class="card-text">Date: ${blog.date}</p>
                    </div>
                </div>
            `;
            blogContainer.appendChild(card); // Añadir la tarjeta a la fila
        });
    } catch (err) {
        console.error("Error:", err);
    }
}

getDataCard();
