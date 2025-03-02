import { Router } from "express";
import { InfoContr } from "../controllers/info.js";


const InfoRouter = Router();


InfoRouter.get('/', InfoContr.Get)
InfoRouter.get('/:id', InfoContr.Get)
InfoRouter.put('/', InfoContr.Put)


export default InfoRouter;