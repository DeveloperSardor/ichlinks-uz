import { Router } from "express";
import { AcitivityContr } from "../controllers/activity.js";

const ActivityRouter = Router();

ActivityRouter.get("/", AcitivityContr.Get);
ActivityRouter.post("/", AcitivityContr.Post);
ActivityRouter.put("/", AcitivityContr.Put);
ActivityRouter.delete("/", AcitivityContr.Delete);

export default ActivityRouter;
