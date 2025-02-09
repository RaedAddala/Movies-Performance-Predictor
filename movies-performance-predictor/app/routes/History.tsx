import type { FC } from 'react';
import type { MoviePrediction } from '../types';
import type { Route } from './+types/History';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Movie Predictor History' },
    { name: 'description', content: 'Welcome to the movie predictor History!' },
  ];
}

const History: FC = () => {
  const predictions = JSON.parse(
    localStorage.getItem('predictions') || '[]',
  ) as MoviePrediction[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Prediction History</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
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
              <tr key={prediction.id}>
                <td>
                  <div className="font-bold">{prediction.title}</div>
                  <div className="text-sm opacity-50">
                    {prediction.director}
                  </div>
                </td>
                <td>{new Date(prediction.releaseDate).toLocaleDateString()}</td>
                <td>${prediction.openingWeekendGross.toLocaleString()}</td>
                <td>${prediction.grossWorldwide.toLocaleString()}</td>
                <td>{prediction.rating.toFixed(1)}</td>
                <td>
                  {prediction.awards} awards
                  <br />
                  <span className="text-sm opacity-50">
                    {prediction.nominations} nominations
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
