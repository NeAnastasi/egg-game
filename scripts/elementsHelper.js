function initNavbar() {
  const navbar = `
        <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        🥚 Яйцебой
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link nav-protected" href="../pages/game.html">Играть</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-protected" href="../pages/choosingEgg.html">Выбор яйца</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    `;
  document.body.insertAdjacentHTML("afterbegin", navbar);
  const navProtect = document.querySelectorAll(".nav-protected");

  navProtect.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!localStorage.getItem("playerName")) {
        event.preventDefault();
        window.location.href = "../pages/startMenu.html";
      }
    });
  });
}
