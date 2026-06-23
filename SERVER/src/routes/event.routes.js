import { addEvent , getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import {Router} from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', authMiddleware, authorize('admin'), addEvent);
router.get('/' ,getAllEvents);
router.get('/:id' , getEventById);
router.put('/:id',authMiddleware, authorize('admin') , updateEvent);
router.delete('/:id', authMiddleware, authorize('admin'), deleteEvent);

export default router;