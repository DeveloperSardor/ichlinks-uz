import { Router } from "express";
import { LeadershipContr } from "../controllers/leadership.js";


const LeadershipRouter = Router();


LeadershipRouter.get('/', LeadershipContr.Get)
LeadershipRouter.get('/:id', LeadershipContr.Get)
LeadershipRouter.post('/', LeadershipContr.Post)
LeadershipRouter.put('/:id', LeadershipContr.Put)
LeadershipRouter.delete('/:id', LeadershipContr.Delete)


export default LeadershipRouter;