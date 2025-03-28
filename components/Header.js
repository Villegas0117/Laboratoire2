function Header() {
  return (
    <header class="header">
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="../Public/indexReact.html">
            <img src="../assets/Logo.jpg" role="imgnav" alt="Logo"></img>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto ">
              <li class="nav-item">
                <a class="nav-link fs-3" href="#">
                  Menu 1
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link fs-3" href="#">
                  Menu 2
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link fs-3" href="#">
                  Menu 3
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link fs-3" href="#">
                  Menu 4
                </a>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-person-circle fs-1"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
