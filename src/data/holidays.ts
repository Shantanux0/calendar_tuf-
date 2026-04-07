export interface Holiday {
  month: number;
  day: number;
  name: string;
  emoji: string;
}

export const HOLIDAYS: Holiday[] = [
  { month: 0, day: 1, name: "New Year's Day", emoji: "🎆" },
  { month: 1, day: 14, name: "Valentine's Day", emoji: "💝" },
  { month: 2, day: 17, name: "St. Patrick's Day", emoji: "☘️" },
  { month: 3, day: 1, name: "April Fool's", emoji: "🃏" },
  { month: 4, day: 5, name: "Cinco de Mayo", emoji: "🎉" },
  { month: 5, day: 21, name: "Summer Solstice", emoji: "☀️" },
  { month: 6, day: 4, name: "Independence Day", emoji: "🎇" },
  { month: 7, day: 26, name: "Women's Equality", emoji: "✊" },
  { month: 8, day: 22, name: "Autumn Equinox", emoji: "🍁" },
  { month: 9, day: 31, name: "Halloween", emoji: "🎃" },
  { month: 10, day: 11, name: "Veterans Day", emoji: "🎖️" },
  { month: 11, day: 25, name: "Christmas", emoji: "🎄" },
  { month: 11, day: 31, name: "New Year's Eve", emoji: "🥂" },
];
