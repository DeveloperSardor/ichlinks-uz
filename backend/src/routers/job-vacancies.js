import { Router } from "express";
import { JobVacanciesContr } from "../controllers/job-vacancies.js";



const JobVacanciesRouter = Router();


JobVacanciesRouter.get('/', JobVacanciesContr.Get)
JobVacanciesRouter.get('/:id', JobVacanciesContr.Get)
JobVacanciesRouter.post('/', JobVacanciesContr.Post)
JobVacanciesRouter.put('/:id', JobVacanciesContr.Put)
JobVacanciesRouter.delete('/:id', JobVacanciesContr.Delete)


export default JobVacanciesRouter;