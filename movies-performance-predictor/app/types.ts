export interface MoviePrediction {
  // Input fields
  title: string;
  description: string;
  filming_location: string;
  duration: number;
  mpaRating: string;
  releaseDate: string;
  genres: string[];
  languages: string[];
  countries: string[];
  budget: number;
  stars: string[];
  writers: string[];
  director: string;
  productionCompanies: string[];

  // Output fields
  openingWeekendGross: number;
  grossWorldwide: number;
  awards: number;
  nominations: number;
  rating: number;

  // Metadata
  id: string;
  predictedAt: string;
}

export const GENRES = [
  'Drama',
  'Comedy',
  'Thriller',
  'Romance',
  'Action',
  'Crime',
  'Adventure',
  'Horror',
  'Mystery',
  'Fantasy',
  'Sci-Fi',
  'Family',
  'Documentary',
  'Animation',
  'Sport',
  'Musical',
  'Western',
  'Biography',
  'war',
  'other_genres',
];

export const LANGUAGES = [
  'English',
  'German',
  'Italian',
  'Spanish',
  'Latin',
  'Cantonese',
  'French',
  'Arabic',
  'Japanese',
  'Mandarin',
  'Russian',
  'Hebrew',
  'Hindi',
  'Portuguese',
];

export const COUNTRIES = [
  "United States",
  "France",
  "Canada",
  "Spain",
  "Japan",
  "India",
  "Mexico",
  "Italy",
  "Australia",
  "Germany",
  "United Kingdom",
  "China",
  "Asian countries",
  "European countries",
  "Nordic countries",
  "Other_regions"
];

export const MPA_RATINGS = [
  'All Audiences',
  'Teen',
  'Mature',
  'Unrated',
];
