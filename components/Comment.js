function Comment ({ coment })
{
      return (
            <div class="mt-4">
                        
                        <div class="mt-4">
                              <div class="border rounded p-3 my-2 d-flex align-items-center">
                                    <img src="../assets/HollowKnight.jpg" alt="Utilisateur01" class="rounded-circle "role="imgProfile" width="50"></img>
                                    <div id="comments">
                                          <p>{coment.content}</p>
                                    </div>
                              </div>
                        </div>
                  </div>  
      );
}