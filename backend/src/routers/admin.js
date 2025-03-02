import { Router } from "express";
import { AdminContr } from "../controllers/admin.js";


const AdminRouter = Router();


AdminRouter.post('/login', AdminContr.Login)
AdminRouter.post('/add', AdminContr.AddAdmin)


export default AdminRouter;