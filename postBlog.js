const urlBlogs = "http://localhost:3000/blogs";

document
  .getElementById("blogForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;
    const date = new Date().toISOString().split("T")[0];

    const blogData = {
      title: title,
      author: author,
      content: content,
      date: date,
    };

    fetch(urlBlogs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        alert("Post publicado correctamente");
        window.location.href = "index.html";

        // Limpiar formulario
        document.getElementById("blogForm").reset();
      })
      .catch((error) => {
        alert("Error al publicar el blog: " + error.message);
      });
  });
