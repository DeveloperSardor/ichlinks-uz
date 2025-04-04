import { Router } from "express";
import { InternalAuditContr } from "../controllers/internal-audit.js";


const AuditRouter = Router();

AuditRouter.get('/', InternalAuditContr.Get)
AuditRouter.get('/:id', InternalAuditContr.Get)
AuditRouter.post('/', InternalAuditContr.Post)
AuditRouter.put('/:id', InternalAuditContr.Put)
AuditRouter.delete('/:id', InternalAuditContr.Delete)



export default AuditRouter