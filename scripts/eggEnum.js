const Eggs = {
  DARKDEFAULT: new Egg(
    1,
    "Стандартное коричневатое яйцо",
    "/egg-game/img/darkEgg.png",
    "/egg-game/sounds/pop.mp3",
    true,
    "Обычное почти-коричневое яйцо, не пытайтесь его покрасить, если у вас нет чёрного цвета. В некоторых магазинах такие остаются единственными, однако мы прибрали их к рукам. Не важно что бить всё-таки, главное бить!"
  ),
  DEFAULT: new Egg(
    2,
    "Стандартное белое яйцо",
    "/egg-game/img/whiteEgg.png",
    "/egg-game/sounds/pop.mp3",
    true,
    "Обычное белое яйцо, ничего специфического. Хорошо красится, если очень хочется, но не у нас, у нас оно просто яйцо, живущее свою яичную жизнь. но надолго ли?"
  ),
  ELODI: new Egg(
    3,
    "Элоди-яйцо",
    "/egg-game/img/elodiEgg.png",
    "/egg-game/sounds/catPurr.mp3",
    false,
    "Где-то в параллельном мире люди стали яйцами, а яйца людьми. Элоди не забыла сохранить свой пучок и галстук-бабочку (говорят глаз на ней иногда моргает), а ещё её всегда держат какие-то руки. Руки ей, впрочем, не помогут, бою быть в любом случае!",
    {
      descriptions: [{desc: "+10% против Мирона. Ссоры сильны." },
        {desc: "-15% против Доры. Любовь зла." }
      ],
      vsSpecific: {
        5: 0.1, // +10% против Мирона
        4: -0.15, // -15% против Доры
      },
    }
  ),
  DORA: new Egg(
    4,
    "Доротея-яйцо",
    "/egg-game/img/doraEgg.png",
    "/egg-game/sounds/photo.mp3",
    false,
    "Щёлк. Если вы услышали этот звук, лучше бегите. Дора не постесняется забрать у вас кусочек души. Но пока у неё перекур перед боем можете быть спокойны. наверно.",
    {
      descriptions: [
        {
          desc: "+15% к силе против Элоди. Сжимая руки сильнее.",
        },
      ],
      vsSpecific: {
        3: 0.15, // +15% против Элоди
      },
    }
  ),
  MIRON: new Egg(
    5,
    "Мирон-яйцо",
    "/egg-game/img/mironEgg.png",
    "/egg-game/sounds/gunReload.mp3",
    false,
    "Яичный страж порядка. Есть пистолет, осторожно! Однако просто так вас Мирон не застрелит, просто выполняйте законы и не криминальничайте у него перед скорлупой. Ваша задача — не оказаться в его «чёрном списке» треснувших нарушителей.",
    {
      descriptions: [
        { desc: "-10% к силе против Элоди. Сестра?/egg-game" },
        { desc: "-30% к силе против Авриона. Любовь жестока." },
        {
          desc: "+15% к силе против Доры. Пора начать курить в положенном месте!!",
        },
      ],
      vsSpecific: {
        3: -0.1,
        4: 0.15,
        6: -0.3,
      },
    }
  ),
  AVRION: new Egg(
    6,
    "Аврион-яйцо",
    "/egg-game/img/avrionEgg.png",
    "/egg-game/sounds/angelChorus.mp3",
    false,
    "Слышно как ангелы поют у Авриона за спиной. Будьте осторожны: после боя с ним хочется покаяться в съеденных омлетах. И cледите, чтобы он не затянул вас под своё влияние в процессе боя! А то совсем немного и вот вы уже разбиваетесь. Зато может быть вознесётесь?",
    {
      descriptions: [{ desc: "+30% к силе против Мирона. Во славу культа!" }],
      vsSpecific: {
        5: 0.3, // +30% против Мирона
      },
    }
  ),
};

const allEggs = Object.values(Eggs);
