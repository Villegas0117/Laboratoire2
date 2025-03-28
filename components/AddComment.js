function AddComment() {
      const [comment, setComment] = React.useState('');
      const [isSubmitting, setIsSubmitting] = React.useState(false);
      const [error, setError] = React.useState(null);
      const [success, setSuccess] = React.useState(false);
    
      // Extraer blogId de la URL (ejemplo: http://.../blogReact.html?id=b2)
      const getBlogIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Esto devolverá "b2" en tu ejemplo
      };
    
      const blogId = getBlogIdFromUrl();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
    
        if (!comment.trim()) {
          setError('Por favor escribe un comentario');
          return;
        }
    
        if (!blogId) {
          setError('No se pudo identificar el blog');
          return;
        }
    
        setIsSubmitting(true);
    
        try {
          // URL de la API (ajusta según tu entorno)
          const API_URL = 'http://localhost:3000/comments'; // Cambia esto por tu endpoint real
          
          // Estructura de datos para coincidir con tus comentarios existentes
          const commentData = {
            blogId: blogId,       // Ejemplo: "b2"
            content: comment.trim(),
            date: new Date().toISOString().split('T')[0]
            // El "id" (como "c10") debería ser generado por el servidor
          };
    
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData)
          });
    
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al enviar el comentario');
          }
    
          setComment('');
          setSuccess(true);
          
          // Recargar comentarios si existe esta función
          if (typeof getComentsDetails === 'function') {
            getComentsDetails();
          }
    
        } catch (err) {
          console.error('Error al enviar comentario:', err);
          setError(err.message || 'Error al enviar el comentario');
        } finally {
          setIsSubmitting(false);
        }
      };
    
      return (
        <div className="container mt-5">
          <h3>Laissez vos commentaires</h3>
          
          {error && (
            <div className="alert alert-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success mb-3">
              <i className="bi bi-check-circle-fill me-2"></i>
              ¡Comentario publicado con éxito!
            </div>
          )}
    
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Ecrivez vos commentaires"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            
            <div className="text-end">
              <button
                className="btn btn-outline-success"
                type="submit"
                disabled={isSubmitting || !comment.trim() || !blogId}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Remettre
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      );
    }