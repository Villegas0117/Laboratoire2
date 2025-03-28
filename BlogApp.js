function BlogApp() {
      return (
        <>
          <Header />
          <main class="container-fluid text-center">
          <BlogDetails/>
          <div class="container">
          <CommentList/>
          </div>
        
          <AddComment/>

          </main>
          
          <Footer />
         </> 
      );
    }
    ReactDOM.createRoot(document.getElementById("root")).render(<BlogApp />);
    