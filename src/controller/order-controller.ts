import { OrderRequest, Penjualan, createOrder, getDataPenjualan } from "../service/order-service.js"

export const postOrder = async (req, res, next) => {
    try {
        const request = req.body as OrderRequest;
        res.status(200).send(await createOrder(request));
    } catch (e) {
        console.log(e);
        res.status(500).send({error: true});
    }
}

export const getPenjualan = async (req, res, next) => {
    try {
        const penjualan: Penjualan = await getDataPenjualan();
        res.status(200).send(penjualan);
    } catch(e) {
        console.error(e);
        res.status(500).send({error: true});
    }
}
