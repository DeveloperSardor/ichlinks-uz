import { Router } from "express";
import { DepartmentContr }  from '../controllers/departments.js'



const DepartmentRouter = Router();

DepartmentRouter.get('/', DepartmentContr.Get)
DepartmentRouter.get('/:id', DepartmentContr.Get)
DepartmentRouter.post('/', DepartmentContr.Post)
DepartmentRouter.put('/:id', DepartmentContr.Put)
DepartmentRouter.delete('/:id', DepartmentContr.Delete)


export default DepartmentRouter;