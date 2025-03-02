import { Router } from "express";
import { CharterContr } from '../controllers/charter.js'


const CharterRouter = Router();

CharterRouter.get('/', CharterContr.Get)
CharterRouter.get('/:id', CharterContr.Get)
CharterRouter.post('/', CharterContr.Post)
CharterRouter.put('/:id', CharterContr.Put)
CharterRouter.delete('/:id', CharterContr.Delete)


export default CharterRouter