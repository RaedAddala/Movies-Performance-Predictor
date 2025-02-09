import { useState } from 'react';
import type { FC, FormEvent } from 'react';

import { useNavigate } from 'react-router';
import type { MoviePrediction } from '../types';
import { GENRES, LANGUAGES, COUNTRIES, MPA_RATINGS } from '../types';
import type { Route } from './+types/PredictionForm';
import { submitPrediction } from '~/services/moviePredictionService';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Movie Predictor Prediction Form' },
    {
      name: 'description',
      content: 'Welcome to the movie predictor PredictionForm',
    },
  ];
}

interface FormError {
  title: string;
  description: string;
}

const PredictionForm: FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FormError | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    duration: 90,
    mpaRating: 'All Audiences',
    description: '',
    filming_location: '',
    releaseDate: new Date().toISOString().split('T')[0],
    genres: [] as string[],
    languages: [] as string[],
    countries: [] as string[],
    budget: 1000000,
    stars: [''] as string[],
    writers: [''] as string[],
    director: '',
    productionCompanies: [''] as string[],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      // Filter out empty strings from arrays
      const cleanedFormData = {
        ...formData,
        stars: formData.stars.filter(star => star.trim() !== ''),
        writers: formData.writers.filter(writer => writer.trim() !== ''),
        productionCompanies: formData.productionCompanies.filter(
          company => company.trim() !== '',
        ),
      };

      const response = await submitPrediction(cleanedFormData);

      const prediction: MoviePrediction = {
        ...cleanedFormData,
        id: crypto.randomUUID(),
        predictedAt: new Date().toISOString(),
        openingWeekendGross:
          response.received.predicted_openingWeekendGross || 0,
        grossWorldwide: response.received.predicted_grossWorldwide || 0,
        awards: response.received.predicted_wins || 0,
        nominations: response.received.predicted_nominations || 0,
        rating: response.received.predicted_IMDB_Rating || 0,
      };

      const predictions = JSON.parse(
        localStorage.getItem('predictions') || '[]',
      );
      localStorage.setItem(
        'predictions',
        JSON.stringify([prediction, ...predictions]),
      );

      navigate('/history');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError({
        title: 'Submission Error',
        description: errorMessage,
      });
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      description: '',
      filming_location: '',
      title: '',
      duration: 90,
      mpaRating: 'All Audiences',
      releaseDate: new Date().toISOString().split('T')[0],
      genres: [],
      languages: [],
      countries: [],
      budget: 1000000,
      stars: [''],
      writers: [''],
      director: '',
      productionCompanies: [''],
    });

    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="space-y-6">
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold">{error.title}</h3>
              <div className="text-xs">{error.description}</div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-8">New Movie Prediction</h1>

      <form onSubmit={handleSubmit} className="space-y-12 justify-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold my-2">
              Basic Information
            </h2>
            <div className="form-control my-1">
              <label className="label">
                <span className="label-text">Movie Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered mx-3 w-92"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text">Movie Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered mx-3"
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text">Duration (minutes)</span>
              </label>
              <input
                type="number"
                className="input input-bordered mx-3"
                value={formData.duration}
                onChange={e =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value),
                  })
                }
                min="1"
                max="300"
                required
              />
            </div>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text">MPA Rating</span>
              </label>
              <select
                className="select select-bordered mx-3 w-92"
                value={formData.mpaRating}
                onChange={e =>
                  setFormData({ ...formData, mpaRating: e.target.value })
                }
                required
              >
                {MPA_RATINGS.map(rating => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text">Release Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered mx-3 w-90"
                value={formData.releaseDate}
                onChange={e =>
                  setFormData({ ...formData, releaseDate: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold my-2">Categories</h2>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text text-xl font-bold my-3">
                  Genres
                </span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {GENRES.map(genre => (
                  <label key={genre} className="label cursor-pointer">
                    <span className="label-text">{genre}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={formData.genres.includes(genre)}
                      onChange={e => {
                        const newGenres = e.target.checked
                          ? [...formData.genres, genre]
                          : formData.genres.filter(g => g !== genre);
                        setFormData({ ...formData, genres: newGenres });
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text text-xl font-bold my-3">
                  Languages
                </span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {LANGUAGES.map(language => (
                  <label key={language} className="label cursor-pointer">
                    <span className="label-text">{language}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={formData.languages.includes(language)}
                      onChange={e => {
                        const newLanguages = e.target.checked
                          ? [...formData.languages, language]
                          : formData.languages.filter(l => l !== language);
                        setFormData({ ...formData, languages: newLanguages });
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control my-1">
              <label className="label">
                <span className="label-text text-xl font-bold my-3">
                  Countries
                </span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {COUNTRIES.map(country => (
                  <label key={country} className="label cursor-pointer">
                    <span className="label-text">{country}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={formData.countries.includes(country)}
                      onChange={e => {
                        const newCountries = e.target.checked
                          ? [...formData.countries, country]
                          : formData.countries.filter(c => c !== country);
                        setFormData({ ...formData, countries: newCountries });
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold my-2">
              Production Details
            </h2>

            <div className="form-control py-1">
              <label className="label">
                <span className="label-text">Budget (USD)</span>
              </label>
              <input
                type="number"
                className="input input-bordered mx-3 w-92"
                value={formData.budget}
                onChange={e =>
                  setFormData({ ...formData, budget: parseInt(e.target.value) })
                }
                min="100"
                max="500000000"
                required
              />
            </div>

            <div className="form-control py-1">
              <label className="label">
                <span className="label-text">Filming Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered mx-3 w-88"
                value={formData.filming_location}
                onChange={e =>
                  setFormData({ ...formData, filming_location: e.target.value })
                }
              />
            </div>

            <div className="form-control py-1">
              <label className="label">
                <span className="label-text">Stars (up to 10)</span>
              </label>
              {formData.stars.map((star, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered my-1 flex-1"
                    value={star}
                    onChange={e => {
                      const newStars = [...formData.stars];
                      newStars[index] = e.target.value;
                      setFormData({ ...formData, stars: newStars });
                    }}
                  />
                  {index === formData.stars.length - 1 && index < 9 && star && (
                    <button
                      type="button"
                      className="btn btn-square btn-outline"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          stars: [...formData.stars, ''],
                        })
                      }
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="form-control py-1">
              <label className="label">
                <span className="label-text">Writers (up to 3)</span>
              </label>
              {formData.writers.map((writer, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered my-1 flex-1"
                    value={writer}
                    onChange={e => {
                      const newWriters = [...formData.writers];
                      newWriters[index] = e.target.value;
                      setFormData({ ...formData, writers: newWriters });
                    }}
                  />
                  {index === formData.writers.length - 1 &&
                    index < 2 &&
                    writer && (
                      <button
                        type="button"
                        className="btn btn-square btn-outline"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            writers: [...formData.writers, ''],
                          })
                        }
                      >
                        +
                      </button>
                    )}
                </div>
              ))}
            </div>

            <div className="form-control py-1">
              <label className="label">
                <span className="label-text">Director</span>
              </label>
              <input
                type="text"
                className="input input-bordered mx-3 flex-1"
                value={formData.director}
                onChange={e =>
                  setFormData({ ...formData, director: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control py-1">
              <label className="label">
                <span className="label-text">
                  Production Companies (up to 5)
                </span>
              </label>
              {formData.productionCompanies.map((company, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered my-1 flex-1"
                    value={company}
                    onChange={e => {
                      const newCompanies = [...formData.productionCompanies];
                      newCompanies[index] = e.target.value;
                      setFormData({
                        ...formData,
                        productionCompanies: newCompanies,
                      });
                    }}
                  />
                  {index === formData.productionCompanies.length - 1 &&
                    index < 4 &&
                    company && (
                      <button
                        type="button"
                        className="btn btn-square btn-outline"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            productionCompanies: [
                              ...formData.productionCompanies,
                              '',
                            ],
                          })
                        }
                      >
                        +
                      </button>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="btn btn-outline"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Predicting...' : 'Submit Prediction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;
