import { Router } from "express";
import {  NationalListContr } from '../controllers/national-list.js'

const NationalListRouter = Router();

NationalListRouter.get('/', NationalListContr.Get)
NationalListRouter.get('/:id', NationalListContr.Get)
NationalListRouter.post('/', NationalListContr.Post)
NationalListRouter.put('/:id', NationalListContr.Put)
NationalListRouter.delete('/:id', NationalListContr.Delete)



export default NationalListRouter;