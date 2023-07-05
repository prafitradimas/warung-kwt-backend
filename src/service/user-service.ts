
import { db } from "../application/database.js";
import { Response } from "../response/ResponseInterface.js"

const users = db.collection('users').get();

const login = async (request: {username: string, password: string}): Promise<Response> => {
    
    const response: Response = {
        code: 200,
        status: "OK",
        message: "User login successfully.",
        data: users
    }
    return response;
}

export {
    login
}
