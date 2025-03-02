import { Router } from "express";
import { RolesContr } from "../controllers/roles.js";


const RolesRouter = Router();



RolesRouter.get('/', RolesContr.Get)
RolesRouter.get('/:id', RolesContr.Get)
RolesRouter.post('/', RolesContr.Post)
RolesRouter.put('/:id', RolesContr.Put)
RolesRouter.delete('/:id', RolesContr.Delete)

export default RolesRouter;