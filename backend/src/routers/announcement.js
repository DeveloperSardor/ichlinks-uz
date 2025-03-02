import { Router } from 'express';
import { AnnouncementContr } from '../controllers/announcement.js';


const AnnouncementRouter = Router();


AnnouncementRouter.get('/', AnnouncementContr.Get)
AnnouncementRouter.get('/:id', AnnouncementContr.Get)
AnnouncementRouter.post('/', AnnouncementContr.Post)
AnnouncementRouter.put('/:id', AnnouncementContr.Update)
AnnouncementRouter.delete('/:id', AnnouncementContr.Delete)



export default AnnouncementRouter;