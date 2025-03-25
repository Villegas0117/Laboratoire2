const urlBlogs = "http://localhost:3000/blogs";
const urlComments = "http://localhost:3000/comments";

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

async function getComentsDetails() {
  try {
    const comments = await commentsBlog(blogId);

    if (comments.length > 0) {
      document.querySelector("#comments").innerHTML = comments
        .map((comment) => `<p>${comment.content}</p>`)
        .join("");
    } else {
      document.querySelector("#comments").textContent = "Comments not found.";
    }
  } catch (err) {
    console.error("Error fetching comments:", err);
  }
}

async function getBlogDetails() {
  try {
    const blog = await getBlog(blogId);

    if (blog) {
      document.querySelector("#blog-title").textContent = blog.title;
      //document.querySelector("#blog-author").textContent = `Author: ${blog.author}`;
      document.querySelector("#blog-content").textContent = blog.content;
    } else {
      console.log("Blog not found.");
      document.querySelector("#blog-content").textContent = "Blog not found.";
    }
  } catch (err) {
    console.error("Error fetching blog details:", err);
  }
}

// Función para obtener el blog
async function getBlog(blogId) {
  try {
    const response = await fetch(`${urlBlogs}?id=${blogId}`);
    const blogs = await response.json();

    // Buscar el blog correspondiente por el id
    return blogs.find((b) => b.id === blogId);
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

async function commentsBlog(blogId) {
  try {
    const response = await fetch(`${urlComments}?blogId=${blogId}`);
    const commentsResponse = await response.json();

    return commentsResponse.filter((comment) => comment.blogId == blogId);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

// Llamar a la función al cargar la página
getBlogDetails();
getComentsDetails();

document
  .getElementById("CommentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const comment = document.getElementById("comment").value;

    const commentData = {
      blogId: blogId,
      content: comment,
      date: new Date().toISOString().split("T")[0] // Genera la fecha en formato YYYY-MM-DD
    };

    fetch(urlComments, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      // Mostrar alerta de éxito con jQuery UI
      $("#alertMessage").text("Comentario publicado con éxito");
      $("#customAlert").dialog({
        modal: true,
        buttons: {
          Ok: function () {
            $(this).dialog("close");
            document.getElementById("CommentForm").reset();
            getComentsDetails(); // Recargar comentarios después de agregar uno nuevo
          },
        },
      });
    })
    .catch((error) => {
      // Mostrar alerta de error con jQuery UI
      $("#alertMessage").text("Error al publicar el comentario: " + error.message);
      $("#customAlert").dialog({
        modal: true,
        buttons: {
          Ok: function () {
            $(this).dialog("close");
          },
        },
      });
    });
  });
