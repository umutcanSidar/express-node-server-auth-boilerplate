import authRouter from './auth/auth.router.js';

export const AppRoutes = (app) => {
  // Auth Router
  app.use(authRouter.routePrefix, authRouter.route());
};
