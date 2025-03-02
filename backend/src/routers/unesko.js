import { Router } from "express";
import { UneskoContr } from "../controllers/unesko.js";



const UneskoRouter = Router();

UneskoRouter.get('/', UneskoContr.Get)
UneskoRouter.get('/:id', UneskoContr.Get)
UneskoRouter.post('/', UneskoContr.Post)
UneskoRouter.put('/:id', UneskoContr.Put)
UneskoRouter.delete('/:id', UneskoContr.Delete)


export default UneskoRouter
