export interface MoviePrediction {
  // Input fields
  title: string;
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
  grossUsCanada: number;
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
  'other',
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
  'United States',
  'United Kingdom',
  'Italy',
  'France',
  'West Germany',
  'Ireland',
  'Canada',
  'Mexico',
  'Spain',
  'Japan',
  'Belgium',
  'Sweden',
  'Hong Kong',
  'Australia',
  'Switzerland',
  'India',
  'Netherlands',
  'China',
  'Germany',
  'North Africa',
  'Sub-Saharan Africa',
  'Middle East',
  'Asia',
  'Eastern Europe',
  'Balkans',
  'Western & Southern Europe',
  'Nordic countries',
  'Caribbean',
  'South America',
  'Other',
];

export const MPA_RATINGS = [
  'R',
  'PG-13',
  'PG',
  'G',
  'Unrated',
  'TV-MA',
  'TV-14',
  'TV-PG',
  'X',
  'Approved',
  'TV-G',
  '16+',
  '18+',
  '13+',
  'TV-Y7',
];
