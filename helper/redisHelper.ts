import {createClient} from "redis"
const rdUrl:any="redis:6379";
const port =  6379;
class RedisHelper {
    private client:any;
    constructor() {
        this.client = createClient({url:`redis://localhost:${port}`});
         this.client.connect();
        this.client.on('connect', () => {
            console.log('Redis Connected');
        });
    }
    async setString(key:any, value:any, expires = 0, database = '') {
        try{
        if (database !== '') {
            this.client.select(database);
        }
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err:any, reply:any) => {
                if (err) {
                    console.log("hererer",err);
                    return reject(err);
                }
                // Add Expire Time if provided
                if (expires !== 0) {
                    this.client.expire(key, (expires));
                }
                resolve(true);
            });
        });
    }catch(err:any){
        console.log("dafadsfdsdasdsf",err)
    }
    }
    async getString(key:any, database = '') {
        if (database !== '') {
            this.client.select(database);
        }
        return new Promise((resolve, reject) => {
            this.client.get(key, (err:any, reply:any) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }
    async destroyDb(dbKey:any) {
        return new Promise((resolve, reject) => {
            this.client.del(dbKey, (err:any, response:any) => {
                if (response === 1) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    async hashSet(key:any, field:any, values:any, expires = 0, database = '') {
        if (database !== '') {
            this.client.select(database);
        }
        return new Promise((resolve, reject) => {
            this.client.hset(key, field, values, (err:any, reply:any) => {
                if (err) {
                    return reject(err);
                }
                // Add Expire Time if provided
                if (expires !== 0) {
                    this.client.expire(key, (expires * 1));
                }
                resolve(reply);
            });
        });
    }
    async hashGet(key:any, field:any, database = '') {
        return new Promise((resolve, reject) => {
            this.client.hget(key, field, (err:any, reply:any) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }
    async hashGetAll(key:any, database = '') {
        return new Promise((resolve, reject) => {
            this.client.hgetall(key, (err:any, reply:any) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }
    async hashMapSet(key:any, values:any, expires = 0, database = '') {
        if (database !== '') {
            this.client.select(database);
        }
        return new Promise((resolve, reject) => {
            this.client.hmset(key, values, (err:any, reply:any) => {
                if (err) {
                    return reject(err);
                }
                if (expires !== 0) {
                    this.client.expire(key, (expires * 1));
                }
                resolve(reply);
            });
        });
    }
}

export default new RedisHelper();