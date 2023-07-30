
import { randomUUID } from "crypto";
import { CreateSupplierRequest } from "../request/RequestType.js"
import { ResponseErr, ResponseOk } from "../response/ResponseType.js";
import { Supplier, createSupplier } from "../service/supplier-service.js";

export const createNewSupplier = async (req, res, next) => {
    const request: CreateSupplierRequest = req.body as CreateSupplierRequest;
    try {
        const supplier: Supplier = await createSupplier({
            username: request.username,
            nama: request.nama,
            email: request.email,
            alamat: request.alamat,
            no_hp: request.no_hp
        });

        const response: ResponseOk = {
            code: 200,
            status: "OK",
            message: `Successfully create supplier.`,
            data: supplier
        };
        res.status(200).send(response);
    } catch (e) {
        const response: ResponseErr = {
            code: 400,
            status: "BAD_REQUEST",
            message: `Username: ${request.username} already taken.`
        };
        res.status(400).send(response);
    }

    try {

    } catch (e) {
        const response: ResponseErr = {
            code: 400,
            status: "BAD_REQUEST",
            message: `Username: ${request.username} already taken.`
        };
        res.status(400).send(response);
    }
}

export const getSupplierById = async (req, res, next) => {

}
