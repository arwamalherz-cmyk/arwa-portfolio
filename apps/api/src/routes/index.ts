import { Router } from 'express';
import { certificatesRouter } from '../modules/certificates/certificates.route.js';
import { contactRouter } from '../modules/contact/contact.route.js';
import { experienceRouter } from '../modules/experience/experience.route.js';
import { healthRouter } from '../modules/health/health.route.js';
import { projectsRouter } from '../modules/projects/projects.route.js';
import { skillsRouter } from '../modules/skills/skills.route.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/certificates', certificatesRouter);
apiRouter.use('/experience', experienceRouter);
apiRouter.use('/skills', skillsRouter);
apiRouter.use('/contact', contactRouter);
