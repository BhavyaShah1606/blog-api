import { Router } from 'express';

import blogCtrl from '../controllers/blog/index.js';

const router = Router();

 router.get('/blog/list',
  [
  ],
  async (req, res, next) => blogCtrl.getBlogList(req, res, next));
 


export default router;
