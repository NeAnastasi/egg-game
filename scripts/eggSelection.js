let selectedEgg = null;

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  const container = document.getElementById("eggsContainer");

  allEggs.forEach((egg) => {
    const isUnlocked = checkUnlocked(egg.id);

    if (isUnlocked) {
      egg.unlocked = true;
    }

    const card = createEggCard(egg, isUnlocked);
    container.insertAdjacentHTML("beforeend", card);
  });

  // Вешаем обработчики
  document.querySelectorAll(".egg-card").forEach((card) => {
    card.addEventListener("click", function () {
      const eggId = parseInt(this.dataset.id);
      const egg = allEggs.find((e) => e.id === eggId);

      if (!egg.unlocked) {
        alert("Это яйцо ещё не открыто! Победи в боях, чтобы получить его.");
        return;
      }

      // Снимаем выделение со всех карточек
      document.querySelectorAll(".egg-card").forEach((c) => {
        c.classList.remove("selected");
      });

      // Выделяем текущую
      this.classList.add("selected");
      selectedEgg = egg;

      // Показываем панель подтверждения
      document.getElementById(
        "selectedEggName"
      ).textContent = `Выбрано: ${egg.name}`;
      document.getElementById("selectionControls").classList.remove("d-none");

      // Проигрываем звук
      egg.playSound();
    });
  });

  document.getElementById("confirmSelection").addEventListener("click", () => {
    if (!selectedEgg) return;

    // Сохраняем выбор и переходим
    localStorage.setItem(
      "selectedEgg",
      JSON.stringify({
        id: selectedEgg.id,
        name: selectedEgg.name,
        image: selectedEgg.image,
      })
    );

    window.location.href = "/egg-game/scripts/game.html";
  });

  // Функции
  function createEggCard(egg, isUnlocked) {
    return `
      <div class="col">
        <div class="egg-card card h-100 ${isUnlocked ? "" : "locked"}" 
             data-id="${egg.id}">
          <img src="${isUnlocked ? egg.image : "/egg-game/img/locked.png"}" 
               class="egg-img card-img-top p-3" 
               alt="${isUnlocked ? egg.name : "Заблокировано"}">
          <div class="card-body">
            ${
              isUnlocked
                ? `
              <h5 class="card-title">${egg.name}</h5>
              <p class="card-text">${egg.description}</p>
            `
                : `
              <h5 class="card-title text-muted text-center">Заблокировано</h5>
              <p class="card-text text-center">Победи в боях, чтобы открыть!</p>
            `
            }
          </div>
        </div>
      </div>
    `;
  }

  function checkUnlocked(eggId) {
    const unlocked = JSON.parse(
      localStorage.getItem("unlockedEggs") || "[1, 2]"
    );
    return unlocked.includes(eggId);
  }

});
