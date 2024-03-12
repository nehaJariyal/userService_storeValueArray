import redisHelper from "../helper/redisHelper";
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number
    email: string;
    password: string
}
redisHelper;
export class UserModel {

   private users: User[] = [];

    addUser(user: User) {
        redisHelper.setString("USERS",JSON.stringify(user));
        this.users.push(user)   
    }
    redis_cli_set(newUser: User) {
        // client.set(`users:${newUser}`, JSON.stringify(newUser));
    }
    redis_cli_get(newUser:User){
        // client.get(`users:${newUser}`);
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
}