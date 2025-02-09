import { useState } from 'react';
import type { FC, FormEvent } from 'react';

import { useNavigate } from 'react-router';
import type { MoviePrediction } from '../types';
import { GENRES, LANGUAGES, COUNTRIES, MPA_RATINGS } from '../types';
import type { Route } from './+types/PredictionForm';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Movie Predictor Prediction Form' },
    {
      name: 'description',
      content: 'Welcome to the movie predictor PredictionForm',
    },
  ];
}

const PredictionForm: FC = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const prediction: MoviePrediction = {
      ...formData,
      id: crypto.randomUUID(),
      predictedAt: new Date().toISOString(),
      openingWeekendGross: Math.random() * 50000000,
      grossWorldwide: Math.random() * 500000000,
      awards: Math.floor(Math.random() * 10),
      nominations: Math.floor(Math.random() * 20),
      rating: Math.random() * 10,
    };

    const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    localStorage.setItem(
      'predictions',
      JSON.stringify([prediction, ...predictions]),
    );

    navigate('/history');
  };

  const handleReset = () => {
    setFormData({
      description: '',
      filming_location: '',
      title: '',
      duration: 90,
      mpaRating: 'PG-13',
      releaseDate: new Date().toISOString().split('T')[0],
      genres: [],
      languages: [],
      countries: [],
      budget: 1000000,
      stars: [''],
      writers: [''],
      director: '',
      productionCompanies: ['']
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">New Movie Prediction</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Basic Information</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Movie Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Movie Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration (minutes)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">MPA Rating</span>
              </label>
              <select
                className="select select-bordered"
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Release Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
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
            <h2 className="card-title">Categories</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Genres</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Languages</span>
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Countries</span>
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
            <h2 className="card-title">Production Details</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Budget (USD)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.budget}
                onChange={e =>
                  setFormData({ ...formData, budget: parseInt(e.target.value) })
                }
                min="100"
                max="500000000"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Filming Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.filming_location}
                onChange={e =>
                  setFormData({ ...formData, filming_location: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Stars (up to 10)</span>
              </label>
              {formData.stars.map((star, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Writers (up to 3)</span>
              </label>
              {formData.writers.map((writer, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Director</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.director}
                onChange={e =>
                  setFormData({ ...formData, director: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Production Companies (up to 5)
                </span>
              </label>
              {formData.productionCompanies.map((company, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
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
            className="btn btn-outline"
          >
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Predict Success
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;
