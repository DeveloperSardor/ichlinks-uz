import { Router } from "express";
import ActivityRouter from "./activity.js";
import AnnouncementRouter from "./announcement.js";
import ArticleRouter from "./articles.js";
import CharterRouter from "./charter.js";
import ContactRouter from "./contact.js";
import DepartmentRouter from "./department.js";
import DocsRouter from "./docs.js";
import InfoRouter from "./info.js";
import JobVacanciesRouter from "./job-vacancies.js";
import LeadershipRouter from "./leadership.js";
import NationalListRouter from "./national-list.js";
import NewsRouter from "./news.js";
import PartnersRouter from "./partners.js";
import ResourcesRouter from "./resources.js";
import RolesRouter from "./roles.js";
import StructureRouter from "./strcuture.js";
import VacancyAppealRouter from "./vacancy-appeal.js";
import UneskoRouter from "./unesko.js";
import LocalListRouter from "./local-list.js";
import AdminRouter from "./admin.js";


const ApiRouter = Router();



ApiRouter.use('/activity', ActivityRouter)
ApiRouter.use('/announcement', AnnouncementRouter)
ApiRouter.use('/articles', ArticleRouter)
ApiRouter.use('/charter', CharterRouter)
ApiRouter.use('/contact', ContactRouter)
ApiRouter.use('/department', DepartmentRouter)
ApiRouter.use('/docs', DocsRouter)
ApiRouter.use('/info', InfoRouter)
ApiRouter.use('/job-vacancies', JobVacanciesRouter)
ApiRouter.use('/leadership', LeadershipRouter)
ApiRouter.use('/national-list', NationalListRouter)
ApiRouter.use('/unesko', UneskoRouter)
ApiRouter.use('/local-list', LocalListRouter)
ApiRouter.use('/news', NewsRouter)
ApiRouter.use('/partners', PartnersRouter)
ApiRouter.use('/resources', ResourcesRouter)
ApiRouter.use('/roles', RolesRouter)
ApiRouter.use('/structure', StructureRouter)
ApiRouter.use('/vacancy-applications', VacancyAppealRouter)
ApiRouter.use('/admin', AdminRouter)





export default ApiRouter;