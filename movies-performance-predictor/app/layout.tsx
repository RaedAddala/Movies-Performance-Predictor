import type { FC } from 'react';
import { Film, Home, History } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';

const Layout: FC = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <div className="navbar bg-white shadow-elevated px-32 h-18">
          <div className="navbar-start">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-90 transition-all duration-200"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Film className="w-6 h-6 inline-block mr-2" />
                Movie Predictor
              </div>
            </Link>
          </div>

          <div className="navbar-end">
            <ul className="menu menu-horizontal gap-2">
              <li>
                <Link
                  to="/"
                  className={`rounded-lg px-4 py-2 font-medium hover:bg-primary-50 transition-all duration-200 ${
                    location.pathname === '/'
                      ? 'bg-primary-50 text-primary-700'
                      : ''
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/predict"
                  className={`rounded-lg px-4 py-2 font-medium hover:bg-primary-50 transition-all duration-200 ${
                    location.pathname === '/predict'
                      ? 'bg-primary-50 text-primary-700'
                      : ''
                  }`}
                >
                  <Film className="w-4 h-4" />
                  New Prediction
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className={`rounded-lg px-4 py-2 font-medium hover:bg-primary-50 transition-all duration-200 ${
                    location.pathname === '/history'
                      ? 'bg-primary-50 text-primary-700'
                      : ''
                  }`}
                >
                  <History className="w-4 h-4" />
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Film className="text-primary-600 w-12 h-12" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    The Expert Movie Predictor
                  </h3>
                  <p className="text-sm text-gray-600">
                    AI-Powered Movie Success Prediction
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Predict your movie's success</p>
                <p>Get insights and analytics</p>
                <p>Email: gl4@insat.ai</p>
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h6 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Features
              </h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/predict"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Box Office Prediction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Historical Data
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Analytics Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h6 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Resources
              </h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h6 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Legal
              </h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-500">
                © {currentYear} Movie Predictor. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
