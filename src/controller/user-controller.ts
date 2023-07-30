
import { ResponseErr, ResponseOk } from "../response/ResponseType.js";
import { User, findUserByUsername } from "../service/user-service.js";

type UserDataResponse = Omit<User, 'password'>;

export const LoginController = async (req, res, next) => {
    try {
        let user: User = await findUserByUsername(req.body.username);
        if(user.password !== req.body.password) {
            const response: ResponseErr = {
                code: 400,
                status: "BAD_REQUEST",
                message: `Username or password is incorrect.`
            };

            res.status(400).send(response);
            return;
        }

        const userData: UserDataResponse = {
            username: user.username,
            role: user.role
        }

        const response: ResponseOk = {
            code: 200,
            status: "OK",
            message: "User login successfully.",
            data: userData
        };

        res.status(200).send(response);
    } catch(err) {
        res.status(400).send({
            code: 404,
            status: "NOT_FOUND",
            message: `User: ${req.body.username} not found.`
        });
        return;
    }
}
