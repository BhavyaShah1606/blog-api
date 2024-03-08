import authRoutes from '../routes/authRoutes.js';
import blogRoutes from '../routes/blogRoutes.js';

const setupRoutes = (app) => {
  app.all('/auth*', authRoutes);
  app.all('/blog*', blogRoutes);



};

export default setupRoutes;
