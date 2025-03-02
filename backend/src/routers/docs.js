import { DocsContr } from "../controllers/docs.js";
import { Router } from "express";


const DocsRouter = Router();

DocsRouter.get('/', DocsContr.Get)
DocsRouter.get('/:id', DocsContr.Get)
DocsRouter.post('/', DocsContr.Post)
DocsRouter.put('/:id', DocsContr.Put)
DocsRouter.delete('/:id', DocsContr.Delete)


export default DocsRouter;