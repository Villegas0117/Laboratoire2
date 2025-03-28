function BlogList() {
      const [blogs, setBlogs] = React.useState([]);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      
      const urlBlogs = "http://localhost:3000/blogs";
      
      React.useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const id = params.get("id");
          const title = params.get("title");
          const author = params.get("author");
          const date = params.get("date");
  
          const blogsCards = `${urlBlogs}?${title ? `title=${title}&` : ""}${
              author ? `author=${author}&` : ""
          }${date ? `date=${date}` : ""}`;
  

          async function fetchData() {
              try {
                  const response = await fetch(blogsCards);
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  setBlogs(data);
                  setLoading(false);
              } catch (err) {
                  setError(err.message);
                  setLoading(false);
              }
          }
  
          fetchData();
      }, []);
  
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
  
      return (
          <main className="container">
              <div className="container">
                  <div className="row mb-3 d-flex justify-content-between">
                     
                      <div className="col-md-6 d-flex">
                          <form className="d-flex w-100" role="search">
                              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                              <button className="btn btn-primary" type="submit">Search</button>
                          </form>
                      </div>
  
                      {/* Select */}
                      <div className="col-md-4 d-flex align-items-center">
                          <label htmlFor="selectOption" className="me-2">Trier par:</label>
                          <select id="selectOption" className="form-select">
                              <option selected>Select</option>
                              <option value="1">Option 1</option>
                              <option value="2">Option 2</option>
                              <option value="3">Option 3</option>
                          </select>
                      </div>
                  </div>
              </div>
  
              <div className="container">
                  <div className="row d-flex justify-content-center" id="BlogContainer">
                      {blogs.map(blog => (
                          <BlogCard key={blog.id} blog={blog} />
                      ))}
                  </div>
              </div>
          </main>
      );
  }