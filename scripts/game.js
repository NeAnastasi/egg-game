document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  // Загрузка данных
  const playerEggData = JSON.parse(
    localStorage.getItem("selectedEgg") ||
      '{"id":1,"image":"/egg-game/img/darkEgg.png"}'
  );
  const unlockedEggs = JSON.parse(
    localStorage.getItem("unlockedEggs") || "[1,2]"
  );
  let wins = parseInt(localStorage.getItem("wins") || "0");

  // Находим выбранное яйцо игрока
  const playerEgg =
    allEggs.find((e) => e.id === playerEggData.id) || allEggs[0];

  // Доступные яйца противника (только разблокированные)
  const availableEnemyEggs = allEggs.filter(
    (e) => unlockedEggs.includes(e.id) && e.id !== playerEgg.id
  );

  // Выбираем случайное яйцо противника
  const enemyEgg =
    availableEnemyEggs[Math.floor(Math.random() * availableEnemyEggs.length)] ||
    allEggs[1];

  // Устанавливаем изображения
  document.documentElement.style.setProperty(
    "--player-egg",
    `url('${playerEgg.image}')`
  );
  document.documentElement.style.setProperty(
    "--enemy-egg",
    `url('${enemyEgg.image}')`
  );

  // Элементы интерфейса
  const fightBtn = document.getElementById("fightBtn");
  const playerEggElement = document.getElementById("playerEgg");
  const enemyEggElement = document.getElementById("enemyEgg");
  const resultModal = new bootstrap.Modal("#resultModal");
  const resultText = document.getElementById("resultText");
  const scoreDisplay = document.getElementById("scoreDisplay");

  // Обновляем счетчик побед
  updateScore();

  // Обработчик боя
  fightBtn.addEventListener("click", startBattle);

  function startBattle() {
    fightBtn.disabled = true;

    // Сброс анимации
    resetAnimation();

    // Анимация удара игрока
    playerEggElement.classList.add("hit-animation");
    playerEgg.playSound();

    setTimeout(() => {
      // Анимация удара противника
      enemyEggElement.classList.add("hit-animation");
      enemyEgg.playSound();

      setTimeout(() => {
        // Расчет результата
        const isWin = calculateResult();
        showResult(isWin);
        fightBtn.disabled = false;
      }, 300);
    }, 300);
  }

  function resetAnimation() {
    playerEggElement.classList.remove("hit-animation");
    enemyEggElement.classList.remove("hit-animation");
    void playerEggElement.offsetWidth; // Форсируем перерасчет
  }

  function calculateResult() {
    // Базовая сила + бонус за победы
    const playerBasePower = 1 + wins * 0.05;
    const enemyBasePower = 1;

    // Модификаторы против конкретных яиц
    const playerPower =
      playerBasePower * playerEgg.getPowerAgainst(enemyEgg.id);
    const enemyPower = enemyBasePower * enemyEgg.getPowerAgainst(playerEgg.id);

    // Общий шанс победы
    const winChance = playerPower / (playerPower + enemyPower);
    return Math.random() < winChance;
  }

  function showResult(isWin) {
    if (isWin) {
      wins++;
      localStorage.setItem("wins", wins);
      resultText.textContent = "🥚 Ты победила! 🎉";
      resultText.className = "text-success";
      checkUnlock(wins);
    } else {
      resultText.textContent = "💥 Поражение... 😢";
      resultText.className = "text-danger";
    }

    updateScore();
    resultModal.show();
  }

  function checkUnlock(wins) {
    const unlockRequirements = { 3: 3, 5: 4, 8: 5, 12: 6 };
    const eggIdToUnlock = unlockRequirements[wins];

    if (eggIdToUnlock) {
      const unlocked = JSON.parse(
        localStorage.getItem("unlockedEggs") || "[1,2]"
      );
      if (!unlocked.includes(eggIdToUnlock)) {
        unlocked.push(eggIdToUnlock);
        localStorage.setItem("unlockedEggs", JSON.stringify(unlocked));
        showUnlockNotification(eggIdToUnlock);
      }
    }
  }

  function showUnlockNotification(eggId) {
    const egg = allEggs.find((e) => e.id === eggId);
    if (!egg) return;

    const toastHTML = `
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div class="toast show" role="alert">
          <div class="toast-header bg-success text-white">
            <strong class="me-auto">Новое яйцо!</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
          </div>
          <div class="toast-body">
            <img src="${egg.image}" width="40" class="me-2">
            <strong>${egg.name}</strong> теперь доступно!
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", toastHTML);
    setTimeout(() => document.querySelector(".toast")?.remove(), 5000);
  }

  function updateScore() {
    scoreDisplay.textContent = `Победы: ${wins}`;
  }
});
