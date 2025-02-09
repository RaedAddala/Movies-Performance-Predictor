import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [index("routes/dashboard.tsx"), route("predict", "routes/PredictionForm.tsx"), route("history", "routes/History.tsx"),
] satisfies RouteConfig;
