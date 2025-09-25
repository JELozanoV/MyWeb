import { Router } from 'express';
import { getProjects } from '../controllers/projectsController';

const router = Router();

router.get('/', getProjects);

export default router;