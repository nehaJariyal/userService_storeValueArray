import redisHelper from "../helper/redisHelper";
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number
    email: string;
    password: string
 }
 export interface Product{ 
category:string
product:string
}
 
 redisHelper;
 export class UserModel {

   private users: User[] = [];
   private product: Product[] = [];

  addUser(user:User){
 this.users.push(user)
 }
 addProduct(product:Product){
    this.product.push(product)
}
    
    addUserRedis(user: User) {
        this.users.push(user)   
        redisHelper.setString("USERS",JSON.stringify(this.users));
    }
    
    getUserRedis(user: User) {
        redisHelper.getString("USERS");
    }
    
    
    getUserByMail(email: string): User | undefined {
        return  this.users.find(user =>  user.email === email);
    }
    getUserByid(id: number): User | undefined {
        return  this.users.find(user =>  user.id === id);
    }
    getAllUsers(): User[] {
        return  this.users ;
    }

 
    isUserAlreadyExist(email:string){
        this.users.find((obj)=>{
            if(obj.email ===email){
                return obj;
            }
        })
    }
    deleteUserByMail(email: string): User|boolean{
        const userIndex = this.users.findIndex((user) => user.email === email);
        if (userIndex !== -1) {
            
            this.users.splice(userIndex, 1);
            redisHelper.setString("USERS",JSON.stringify(this.users));
            return true;
        }
        return false;
    }
}
