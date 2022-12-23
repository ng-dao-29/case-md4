import {Router} from "express";
import {Dashboard} from "../controllers/dashboard";
const dashboard = Router();

dashboard.get('/home', Dashboard.showHome);
dashboard.get('/update',Dashboard.formUpdate)
export default dashboard;