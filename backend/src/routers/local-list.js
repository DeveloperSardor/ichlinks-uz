import { Router } from "express";
import { LocalContr } from "../controllers/local-list.js";


const LocalListRouter = Router();


LocalListRouter.get('/', LocalContr.Get)
LocalListRouter.get('/:id', LocalContr.Get)
LocalListRouter.post('/', LocalContr.Post)
LocalListRouter.put('/:id', LocalContr.Put)
LocalListRouter.delete('/:id', LocalContr.Delete)


export default LocalListRouter