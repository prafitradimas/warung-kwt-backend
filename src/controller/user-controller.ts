
import { login } from "../service/user-service.js";
import { Response } from "../response/ResponseInterface.js";

const LoginController = async (req, res, next) => {
    const response: Response = await login({
        username: req.body.username, 
        password: req.body.password
    });

    if(response.code === 200) {
        res.status(200).send(response);
    } else {
        res.status(400).send(response);
    }
}

export {
    LoginController
}
