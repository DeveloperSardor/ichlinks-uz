import { VacancyAppealContr } from "../controllers/vacancy-appeal.js";
import { Router } from "express";



const VacancyAppealRouter = Router();



VacancyAppealRouter.get('/', VacancyAppealContr.Get)
VacancyAppealRouter.get('/:id', VacancyAppealContr.Get)
VacancyAppealRouter.post('/', VacancyAppealContr.Post)
VacancyAppealRouter.delete('/:id', VacancyAppealContr.Delete)


export default VacancyAppealRouter;