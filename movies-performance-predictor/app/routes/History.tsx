import { Fragment, useState } from 'react';
import type { FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { MoviePrediction } from '../types';
import type { Route } from './+types/History';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Movie Predictor History' },
    { name: 'description', content: 'Welcome to the movie predictor History!' },
  ];
}

const History: FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const predictions = JSON.parse(
    localStorage.getItem('predictions') || '[]',
  ) as MoviePrediction[];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Prediction History</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Opening Weekend</th>
              <th>Worldwide Gross</th>
              <th>Rating</th>
              <th>Awards</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(prediction => (
              <Fragment key={prediction.id}>
                <tr
                  className={`cursor-pointer transition-colors duration-200 hover:bg-base-200 ${
                    expandedId === prediction.id ? 'bg-base-200' : ''
                  }`}
                  onClick={() => toggleExpand(prediction.id)}
                >
                  <td>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-base-300 transition-transform duration-200">
                      {expandedId === prediction.id ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold hover:text-primary transition-colors duration-200">
                      {prediction.title}
                    </div>
                    <div className="text-sm opacity-50">
                      {prediction.director}
                    </div>
                  </td>
                  <td>
                    {new Date(prediction.releaseDate).toLocaleDateString()}
                  </td>
                  <td>${prediction.openingWeekendGross.toLocaleString()}</td>
                  <td>${prediction.grossWorldwide.toLocaleString()}</td>
                  <td>
                    <div className="font-semibold">
                      {prediction.rating.toFixed(1)}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {prediction.awards} wins
                      </span>
                      <span className="text-sm opacity-50">
                        {prediction.nominations} nominations
                      </span>
                    </div>
                  </td>
                </tr>
                {expandedId === prediction.id && (
                  <tr>
                    <td colSpan={7}>
                      <div className="p-6 bg-base-100 border-l-4 border-primary animate-fadeIn">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="prose">
                              <h3 className="text-lg font-semibold mb-2">
                                Movie Details
                              </h3>
                              <p className="mb-4">
                                <span className="font-bold text-primary">
                                  Description:
                                </span>{' '}
                                {prediction.description}
                              </p>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <p>
                                  <span className="font-bold text-primary">
                                    Filming Location:
                                  </span>{' '}
                                  {prediction.filming_location}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Duration:
                                  </span>{' '}
                                  {prediction.duration} minutes
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    MPA Rating:
                                  </span>{' '}
                                  {prediction.mpaRating}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Budget:
                                  </span>{' '}
                                  ${prediction.budget.toLocaleString()}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Director:
                                  </span>{' '}
                                  {prediction.director}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="prose">
                              <h3 className="text-lg font-semibold mb-2">
                                Additional Information
                              </h3>
                              <div className="space-y-2">
                                <p>
                                  <span className="font-bold text-primary">
                                    Genres:
                                  </span>{' '}
                                  {prediction.genres.map(genre => (
                                    <span
                                      key={genre}
                                      className="badge badge-outline mr-1"
                                    >
                                      {genre}
                                    </span>
                                  ))}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Languages:
                                  </span>{' '}
                                  {prediction.languages.join(', ')}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Countries:
                                  </span>{' '}
                                  {prediction.countries.join(', ')}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Stars:
                                  </span>{' '}
                                  {prediction.stars.join(', ')}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Writers:
                                  </span>{' '}
                                  {prediction.writers.join(', ')}
                                </p>
                                <p>
                                  <span className="font-bold text-primary">
                                    Production Companies:
                                  </span>{' '}
                                  {prediction.productionCompanies.join(', ')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-base-content/60 flex items-center justify-end">
                          <span>
                            Predicted at:{' '}
                            {new Date(prediction.predictedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
