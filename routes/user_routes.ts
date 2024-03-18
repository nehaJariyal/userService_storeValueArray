import * as  express from "express";
import * as  UserController from "../controllers/user_controller"
import redisHelper from "../helper/redisHelper";
redisHelper;
class UserRoutes {
    public router:any;

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get("/",(req:express.Request,res:express.Response)=>{
            res.json({data:"welcome !"});
            })
            .post('/sign',UserController.signUp)
            .get('/login',UserController.login)
            .get('/profile',UserController.getProfile)
            .get('/allData',UserController.getAllUsers)
            .delete('/deleteUser', UserController.deleteUser)
            .post('/product',UserController.userProduct)
            .post("/deletedb",UserController.deleteDB)
    }
}


export default new UserRoutes();