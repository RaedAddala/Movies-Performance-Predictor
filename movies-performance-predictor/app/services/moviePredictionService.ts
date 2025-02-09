import type { MoviePrediction } from '~/types';

interface PredictionResponse {
  received: {
    predicted_grossWorldwide: number;
    predicted_openingWeekendGross: number;
    predicted_wins: number;
    predicted_nominations: number;
    predicted_IMDB_Rating: number;
    predicted_meta_score: number;
  };
}

export const submitPrediction = async (
  formData: Omit<
    MoviePrediction,
    | 'id'
    | 'predictedAt'
    | 'openingWeekendGross'
    | 'grossWorldwide'
    | 'awards'
    | 'nominations'
    | 'rating'
  >,
) => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.title,
      description: formData.description,
      filming_location: formData.filming_location,
      duration: formData.duration,
      mpaRating: formData.mpaRating,
      releaseDate: formData.releaseDate,
      genres: formData.genres,
      languages: formData.languages,
      countries: formData.countries,
      budget: formData.budget,
      stars: formData.stars,
      writers: formData.writers,
      director: formData.director,
      productionCompanies: formData.productionCompanies,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit prediction');
  }

  return response.json() as Promise<PredictionResponse>;
};
