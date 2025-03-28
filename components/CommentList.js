function CommentList() {
      const urlComments = "http://localhost:3000/comments";
      const [comments, setComments] = React.useState([]);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
    
      React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const blogId = params.get("id");
    
        async function fetchComments() {
          try {
            setLoading(true);
            const response = await fetch(`${urlComments}?blogId=${blogId}`);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const allComments = await response.json();
            const filteredComments = allComments.filter(comment => comment.blogId == blogId);
            
            setComments(filteredComments);
            setError(null);
          } catch (err) {
            console.error("Error fetching comments:", err);
            setError(err.message);
            setComments([]);
          } finally {
            setLoading(false);
          }
        }
    
        if (blogId) {
          fetchComments();
        }
      }, []);
    
      if (loading) {
        return <div>Loading comments...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (comments.length === 0) {
        return <div>No comments found.</div>;
      }
    
      return (
        <div className="mt-4">
          <h4>Commentaires</h4>
          {comments.map((comment) => (
            <Comment key={comment.id} coment={comment} />
          ))}
        </div>
      );
    }