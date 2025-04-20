document.addEventListener("DOMContentLoaded", function () {
  initNavbar();

  document.getElementById("startBtn").addEventListener("click", () => {
    const playerName =
      document.getElementById("playerName").value.trim() || "Оля";
    const opponentName =
      document.getElementById("opponentName").value.trim() || "Настя";

    localStorage.setItem("playerName", playerName);
    localStorage.setItem("opponentName", opponentName);

    window.location.href = "game.html"; // Явное перенаправление
  });
});
