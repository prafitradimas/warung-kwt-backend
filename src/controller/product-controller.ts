
import { CreateProductRequest } from "../request/RequestType.js"
import { ResponseErr, ResponseOk } from "../response/ResponseType.js";
import { Product, acceptProduct, createProduct, findAllProduct, updateProduct } from "../service/product-service.js";

const createNewProduct = async (req, res, next) => {
    const request: CreateProductRequest = req.body as CreateProductRequest;
    try {
        const product: Product = await createProduct(request);
        const response: ResponseOk = {
            code: 200,
            status: "OK",
            message: "Successfully added product.",
            data: product
        }
        res.status(200).send(response);
    } catch (e) {
        const response: ResponseErr = {
            code: 400,
            status: "BAD_REQUEST",
            message: `Supplier: ${request.supplier_id} not exist.`
        }
        res.status(400).send(response);
    }
}

const getProductById = async (req, res, next) => {

}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await findAllProduct();
        res.status(200).send({
            code: 200,
            status: "OK",
            message: "",
            data: products
        });
    } catch(e) {
        res.status(500).send();
    }
}

export const acceptProductApi = async (req, res, next) => {
    try {
        const id: string = req.params.id;
        if(id === null || id === undefined) {
            res.status(400).send("id must not be null");
        }
        const product = await acceptProduct(id);
        res.status(200).send(product);
    } catch(e) {
        console.log(e);
        res.status(404).send();
    }
}

export const updateProductApi = async (req, res, next) => {
    try {
        const product: Product = req.body as Product;
        const doc = await updateProduct(product);
        res.status(200).send({
            code: 200,
            status: "OK",
            message: "",
            data: doc
        });
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

export {
    createNewProduct,
    getAllProducts,
    getProductById,
}
