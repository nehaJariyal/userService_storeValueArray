import express, { Request, Response } from "express";
import bodyParser, { json } from "body-parser";
import { UserModel, User, Product } from '../models/user_model';
import redisHelper from "../helper/redisHelper";
redisHelper;
const userModel = new UserModel()

export const signUp = async (req: Request, res: Response) => {
    const {

        firstName,
        lastName,
        email,
        password,
        age
    } = req.body
    const allUsers = userModel.getAllUsers();

    const id = allUsers.length > 0 ? Math.max(...allUsers.map(user => user.id)) + 1 : 1;


    const newUser: User = {
        id,
        firstName,
        lastName,
        email,
        password,
        age
    }

    const isUserExist = userModel.getUserByMail(email);
    if (isUserExist) {
        res.status(202).json("User Email Already Existing");
        console.log("User Email Already Existing");
    }
    else {
        userModel.addUserRedis(newUser)
        res.status(200).json({ massage: " Store data in redis Sign Up Successfuly", user: newUser })
        console.log(newUser)
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user = userModel.getUserByMail(email)

    if (user && user.password === password) {
        res.status(200).json({ message: "Login Successful", user })



    }
    else {
        res.status(401).json({ message: "Invalid Credential" })
    }
}

export const getProfile = async (req: any, res: Response) => {
    const user_email :string= req.query.email;
    const userMail = userModel.getUserByMail(user_email)
    if (userMail) {
        res.status(200).json({ data: userMail })

    } else {
        res.json({ massage: "User Email  Not Found" })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    const user = userModel.getAllUsers()
    res.status(200).json({ all_users_data: user })
}
export const getDatabyid = (req: Request, res: Response) => {
    const {

        firstName,
        lastName,
        email,
        password,
        age
    } = req.body
    const id = userModel.getAllUsers().length + 1;


    const newUser: User = {
        id,
        firstName,
        lastName,
        email,
        password,
        age
    }

    const isUserExist = userModel.getAllUsers().find((element) => element.email === email);
    if (isUserExist) {
        res.status(202).json("User Email Already Existing ")
        console.log("user email Already Existing")

    } else {
        userModel.addUser(newUser)
        res.status(200).json({ massage: "sign up successfuly", user: newUser })
    }

}

export const deleteUser = async (req: any, res: Response) => {
    const  email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: 'Email parameter is missing' });
    }

    const deleted = userModel.deleteUserByMail(email);

    if (deleted) { 
        console.log({ message: `Email ${email} deleted successfully` });
        return res.status(200).json({ message: `Email ${email} deleted successfully` });

    } else 
    
    {
        console.log({ message: `Email ${email} deleted successfully` });
        return res.status(404).json({ message: `Email ${email} not found` });
    }
};

export const userProduct= async (req:any ,res:Response)=>{
const {
product,
category
}=req.body 

const addProduct: Product = {
    product,
    category
    }
    userModel.addProduct(addProduct)
       await redisHelper.hashSet("USERPRODCUT",category , product);
       const resp=await redisHelper.hashGet("USERPRODCUT",category);
        res.status(200).json({data:resp,code:200,message:"Request done successfully" })     
}

export const deleteDB= async (req:any, res:Response)=>{
    try{
    const key=req.body
redisHelper.destroyDb(key)
res.status(200).json({ code:200,message :"destroy db sucessfully"})
    }catch(e){
        console.log(e)
    }
} 