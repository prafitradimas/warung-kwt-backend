
import express from "express";
import { LoginController } from "../controller/user-controller.js";
import { acceptProductApi, createNewProduct, getAllProducts, updateProductApi } from "../controller/product-controller.js";

import { getPenjualan, postOrder } from "../controller/order-controller.js";
import { createNewSupplier } from "../controller/supplier-controller.js";

const publicRouter = express.Router();
publicRouter.post('/api/login', LoginController);

publicRouter.get('/api/products', getAllProducts);
publicRouter.post('/api/products', createNewProduct);
publicRouter.patch('/api/products/:id', acceptProductApi);
publicRouter.put("/api/products", updateProductApi);

publicRouter.post('/api/suppliers', createNewSupplier);

publicRouter.post('/api/orders', postOrder);
publicRouter.get('/api/orders', getPenjualan);

export { publicRouter };
