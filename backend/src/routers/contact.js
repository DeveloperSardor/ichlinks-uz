import { Router } from "express";
import { ContactContr } from "../controllers/contact.js";

const ContactRouter = Router();

ContactRouter.get('/', ContactContr.GetForAdmin)
ContactRouter.post('/', ContactContr.Post)
ContactRouter.delete('/:id', ContactContr.Delete)


export default ContactRouter