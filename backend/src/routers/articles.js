import { Router } from "express";
import { ArticlesContr } from "../controllers/articles.js";

const ArticleRouter = Router();

ArticleRouter.get('/', ArticlesContr.Get);
ArticleRouter.get('/:id', ArticlesContr.Get);
ArticleRouter.post('/', ArticlesContr.Post);
ArticleRouter.put('/:id', ArticlesContr.Put);
ArticleRouter.delete('/:id', ArticlesContr.Delete);

export default ArticleRouter;
