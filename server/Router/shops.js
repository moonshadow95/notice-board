import express from 'express';
import {createShops, edit, getAll, getById, remove} from "../Controller/shopsController.js";
import {isAuth} from "../middleware/auth.js";


const shopsRouter = express.Router();

shopsRouter.post('/insert', isAuth, createShops)
shopsRouter.get('/get', getAll)
shopsRouter.get('/get/:id', isAuth, getById)
shopsRouter.put("/edit/:id", isAuth, edit)
shopsRouter.delete("/delete/:id", isAuth,remove)


export default shopsRouter;