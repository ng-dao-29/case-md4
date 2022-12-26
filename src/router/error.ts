import {Router} from "express";
import {Error} from "../controllers/error.controller";

const error = Router();

error.get('/500', Error.error500);
error.get('/404',Error.error404)
export default error;