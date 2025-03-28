function BlogDetails() {
    const urlBlogs = "http://localhost:3000/blogs";
    const [blog, setBlog] = React.useState(null);
    
    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
  
      async function getBlogDetails() {
        try {
          const blogData = await getBlog(id);
          if (blogData) {
            setBlog(blogData);
          } else {
            console.log("Blog not found.");
          }
        } catch (err) {
          console.error("Error fetching blog details:", err);
        }
      }
  
      async function getBlog(blogId) {
        try {
          const response = await fetch(`${urlBlogs}/${blogId}`);
          return await response.json();
        } catch (err) {
          console.error("Error fetching blog:", err);
          return null;
        }
      }
      
      if (id) {
        getBlogDetails();
      }
    }, []);
  
    if (!blog) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container">
        <img
          src="../assets/1358647.png"
          alt="imgenPrueba"
          className="img-fluid"
        />
        <h1 className="text-center">{blog.title}</h1>
        <div className="container">{blog.content}</div>
      </div>
    );
  }