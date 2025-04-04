import { Router } from "express";
import { ExpeditionsContr  } from '../controllers/expeditions.js'

const ExpeditionsRouter = Router();

ExpeditionsRouter.get('/', ExpeditionsContr.Get)
ExpeditionsRouter.get('/:id', ExpeditionsContr.Get)
ExpeditionsRouter.post('/', ExpeditionsContr.Post)
ExpeditionsRouter.put('/:id', ExpeditionsContr.Put)
ExpeditionsRouter.delete('/:id', ExpeditionsContr.Delete)



export default ExpeditionsRouter;