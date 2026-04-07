export interface MonthPalette {
  bg: string;
  accent: string;
  soft: string;
  text: string;
  card: string;
}

export interface MonthTheme {
  name: string;
  image: string;
  palette: MonthPalette;
  quote: string;
  author: string;
  mood: string;
}

export const MONTH_THEMES: Record<number, MonthTheme> = {
  0: {
    name: "January",
    image: "/images/jan.png",
    palette: { bg: "#0d1b2a", accent: "#7EB8D4", soft: "#1a2f42", text: "#e8f4f8", card: "#122233" },
    quote: "In the depth of winter, I finally learned there was in me an invincible summer.",
    author: "Albert Camus",
    mood: "❄️ Frost & Stillness"
  },
  1: {
    name: "February",
    image: "/images/feb.png",
    palette: { bg: "#1a0a0f", accent: "#E8678A", soft: "#2d1020", text: "#fce4ec", card: "#220d16" },
    quote: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
    mood: "🌹 Warmth & Love"
  },
  2: {
    name: "March",
    image: "/images/mar.png",
    palette: { bg: "#0a1a0e", accent: "#66BB6A", soft: "#132a18", text: "#e8f5e9", card: "#0d1f11" },
    quote: "No matter how long the winter, spring is sure to follow.",
    author: "Proverb",
    mood: "🌿 Renewal & Growth"
  },
  3: {
    name: "April",
    image: "/images/apr.png",
    palette: { bg: "#1a1000", accent: "#FFB347", soft: "#2a1f00", text: "#fff8e1", card: "#201400" },
    quote: "April hath put a spirit of youth in everything.",
    author: "Shakespeare",
    mood: "🌸 Bloom & Wonder"
  },
  4: {
    name: "May",
    image: "/images/may.png",
    palette: { bg: "#001a1a", accent: "#26C6DA", soft: "#002a2a", text: "#e0f7fa", card: "#001f1f" },
    quote: "May is a patchwork of color and warmth.",
    author: "Unknown",
    mood: "🌊 Clarity & Energy"
  },
  5: {
    name: "June",
    image: "/images/jun.png",
    palette: { bg: "#1a1500", accent: "#FFCA28", soft: "#2a2000", text: "#fffde7", card: "#201a00" },
    quote: "Summertime is always the best of what might be.",
    author: "Charles Bowden",
    mood: "☀️ Gold & Freedom"
  },
  6: {
    name: "July",
    image: "/images/jul.png",
    palette: { bg: "#1a0010", accent: "#F06292", soft: "#2a0020", text: "#fce4ec", card: "#200015" },
    quote: "Live in the sunshine, swim the sea, drink the wild air.",
    author: "Emerson",
    mood: "🌅 Heat & Passion"
  },
  7: {
    name: "August",
    image: "/images/aug.png",
    palette: { bg: "#0f001a", accent: "#AB47BC", soft: "#1e0030", text: "#f3e5f5", card: "#130020" },
    quote: "August is the Sunday of summer.",
    author: "Unknown",
    mood: "🌙 Dreamy & Vast"
  },
  8: {
    name: "September",
    image: "/images/sep.png",
    palette: { bg: "#1a0800", accent: "#FF7043", soft: "#2a1000", text: "#fbe9e7", card: "#200a00" },
    quote: "September tries its best to have us forget summer.",
    author: "Bernard Williams",
    mood: "🍂 Change & Depth"
  },
  9: {
    name: "October",
    image: "/images/oct.png",
    palette: { bg: "#120800", accent: "#FF8F00", soft: "#1e1000", text: "#fff8e1", card: "#180b00" },
    quote: "Autumn is a second spring when every leaf is a flower.",
    author: "Albert Camus",
    mood: "🎃 Mystery & Fire"
  },
  10: {
    name: "November",
    image: "/images/nov.png",
    palette: { bg: "#080a1a", accent: "#5C6BC0", soft: "#10133a", text: "#e8eaf6", card: "#0a0d22" },
    quote: "November always seemed to me the Norway of the year.",
    author: "Emily Dickinson",
    mood: "🌫️ Quiet & Still"
  },
  11: {
    name: "December",
    image: "/images/dec.png",
    palette: { bg: "#001a18", accent: "#26A69A", soft: "#002a26", text: "#e0f2f1", card: "#001f1c" },
    quote: "December is not the end. It is the eve of a new beginning.",
    author: "Unknown",
    mood: "✨ Magic & Reflection"
  }
};
