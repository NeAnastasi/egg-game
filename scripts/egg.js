class Egg {
  constructor(id, name, image, sound, isUnlocked, description, traits = {}) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.sound = sound ? this.loadSound(sound) : null;
    this.isUnlocked = isUnlocked;
    this.description = description;
    this.traits = traits.vsSpecific || {};
    this.isResearched = false;
  }

  loadSound(path) {
    const audio = new Audio(path);
    audio.preload = "auto";
    audio.volume = 0.7;
    return audio;
  }

  playSound() {
    if (!this.sound) return;
    this.sound.currentTime = 0;
    this.sound.play().catch(e => console.log("Sound error:", e));
  }

  getPowerAgainst(enemyId) {
    const modifier = this.traits[enemyId] || 0;
    console.log(modifier)
    return Math.max(0.1, 1.0 + modifier); // Минимум 10% силы
  }

  select() {
    if (!this.isResearched && ++this.timesUsed >= 3) {
      this.isResearched = true;
      return true;
    }
    return false;
  }
}