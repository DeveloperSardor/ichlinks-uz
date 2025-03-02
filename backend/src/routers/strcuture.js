import { StructureContr } from "../controllers/structure.js";
import { Router } from "express";


const StructureRouter = Router();


StructureRouter.get('/', StructureContr.Get)
StructureRouter.put('/', StructureContr.Put)


export default StructureRouter;