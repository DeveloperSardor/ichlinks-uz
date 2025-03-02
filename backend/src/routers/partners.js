import { Router } from "express";
import { PartnersContr } from "../controllers/partners.js";


const PartnersRouter = Router();

PartnersRouter.get('/', PartnersContr.Get)
PartnersRouter.post('/', PartnersContr.Post)
PartnersRouter.put('/:id', PartnersContr.Put)
PartnersRouter.delete('/:id', PartnersContr.Delete)


export default PartnersRouter;