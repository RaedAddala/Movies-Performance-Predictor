import { Link } from 'react-router';
import {
  Film,
  History,
  TrendingUp,
  DollarSign,
  Star,
  Trophy,
  Calendar,
} from 'lucide-react';
import type { MoviePrediction } from '../types';
import type { FC } from 'react';
import type { Route } from './+types/dashboard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movie Predictor Dashboard" },
    { name: "description", content: "Welcome to the movie predictor Dashboard!" },
  ];
}

const Dashboard: FC = () => {
  const predictions = JSON.parse(
    localStorage.getItem('predictions') || '[]',
  ) as MoviePrediction[];
  const totalPredictions = predictions.length;
  const averageRating =
    predictions.reduce((acc, curr) => acc + curr.rating, 0) /
      totalPredictions || 0;
  const highestGrossing = predictions.reduce(
    (acc, curr) => (acc.grossWorldwide > curr.grossWorldwide ? acc : curr),
    predictions[0],
  );
  const totalAwards = predictions.reduce((acc, curr) => acc + curr.awards, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-secondary-900">
          Movie Success Dashboard
        </h1>
        <Link
          to="/predict"
          className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Film className="w-5 h-5 mr-2" />
          New Prediction
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:shadow-glow transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-primary-100 text-sm font-medium">
                  Total Predictions
                </p>
                <h3 className="text-3xl font-bold mt-1">{totalPredictions}</h3>
              </div>
              <Film className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-md hover:shadow-elevated transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-secondary-100 text-sm font-medium">
                  Average Rating
                </p>
                <h3 className="text-3xl font-bold mt-1">
                  {averageRating.toFixed(1)}
                </h3>
              </div>
              <Star className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-md hover:shadow-elevated transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-accent-100 text-sm font-medium">
                  Total Awards
                </p>
                <h3 className="text-3xl font-bold mt-1">{totalAwards}</h3>
              </div>
              <Trophy className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-md hover:shadow-elevated transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-primary-100 text-sm font-medium">
                  Highest Grossing
                </p>
                <h3 className="text-xl font-bold mt-1 truncate">
                  {highestGrossing?.title || 'None'}
                </h3>
              </div>
              <DollarSign className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2 text-secondary-900">
              <Calendar className="w-5 h-5 text-primary-500" />
              Recent Predictions
            </h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-base-200">Title</th>
                    <th className="bg-base-200">Rating</th>
                    <th className="bg-base-200">Gross</th>
                    <th className="bg-base-200">Awards</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.slice(0, 5).map(prediction => (
                    <tr
                      key={prediction.id}
                      className="hover:bg-base-200 transition-colors duration-200"
                    >
                      <td className="font-medium">{prediction.title}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {prediction.rating.toFixed(1)}
                        </div>
                      </td>
                      <td>${prediction.grossWorldwide.toLocaleString()}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-accent-500" />
                          {prediction.awards}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link to="/history" className="btn btn-ghost btn-sm">
                View All
                <History className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2 text-secondary-900">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Average Budget
                  </span>
                  <span className="text-sm text-secondary-500">
                    Last 30 days
                  </span>
                </div>
                <div className="text-2xl font-bold text-secondary-900">
                  $
                  {(
                    predictions.reduce((acc, curr) => acc + curr.budget, 0) /
                      totalPredictions || 0
                  ).toLocaleString()}
                </div>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Success Rate
                  </span>
                  <span className="text-sm text-secondary-500">
                    Based on ratings
                  </span>
                </div>
                <div className="text-2xl font-bold text-secondary-900">
                  {(
                    (predictions.filter(p => p.rating > 7).length /
                      totalPredictions) *
                      100 || 0
                  ).toFixed(1)}
                  %
                </div>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondary-700">
                    Most Common Genre
                  </span>
                  <span className="text-sm text-secondary-500">All time</span>
                </div>
                <div className="text-2xl font-bold text-secondary-900">
                  {predictions[0]?.genres[0] || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
