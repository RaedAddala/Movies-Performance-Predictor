import { index, layout, route } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

export default [
  layout('layout.tsx', [
    index('routes/dashboard.tsx'),
    route('predict', 'routes/PredictionForm.tsx'),
    route('history', 'routes/History.tsx'),
  ]),
] satisfies RouteConfig;
