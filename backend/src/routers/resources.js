import { ResourceContr } from "../controllers/resources.js";
import { Router } from "express";

const ResourcesRouter = Router();

ResourcesRouter.get('/', ResourceContr.Get);
ResourcesRouter.get('/:id', ResourceContr.Get);
ResourcesRouter.post('/', ResourceContr.Post);
ResourcesRouter.put('/:id', ResourceContr.Put);
ResourcesRouter.delete('/:id', ResourceContr.Delete);

export default ResourcesRouter;
