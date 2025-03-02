import { Router } from "express";
import { NewsContr } from "../controllers/news.js";


const NewsRouter = Router();


NewsRouter.get('/', NewsContr.Get)
NewsRouter.get('/:id', NewsContr.Get)
NewsRouter.post('/', NewsContr.Post)
NewsRouter.put('/:id', NewsContr.Put)
NewsRouter.delete('/:id', NewsContr.Delete)


export default NewsRouter;