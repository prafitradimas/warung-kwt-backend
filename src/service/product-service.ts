
import { randomUUID } from "crypto";
import { db } from "../application/database.js";
import { CreateProductRequest } from "../request/RequestType.js";

export type Product = {
    id_product: string,
    nama: string,
    id_supplier: string,
    jenis: string,
    harga: number,
    sisa: number,
    jumlah: number,
    tgl_regis: string,
    fee: number
}

export async function createProduct(request: CreateProductRequest): Promise<Product> | never {
    const str_id = randomUUID().toString().replace("-", "");
    const tgl = new Date(Date.now()).toLocaleDateString();
    const product: Product = {
        id_product: str_id,
        nama: request.nama,
        id_supplier: request.supplier_id,
        jenis: request.jenis,
        harga: request.harga,
        sisa: request.jumlah,
        jumlah: request.jumlah,
        tgl_regis: tgl,
        fee: 1000
    };

    await db.collection('penitipan').doc(product.id_product).create(product);
    return product;
}

export async function findProductById(id: string) {

}

export async function findAllProduct() {
    const snapshot = await db.collection('products').get();
    const docs = snapshot.docs;
    const products = docs.map(doc => { 
        return doc.data();
    });
    return products;
}

export async function acceptProduct(id: string) {
    console.log(`patch product: ${id}`);
    const queryProduct = await db.collection("penitipan").doc(id).get();
    if(!queryProduct.exists) {
        throw new Error("No matching documents");
    }
    const product = queryProduct.data() as Product;

    await db.collection("products").doc(product.id_product).create(product);
    await db.collection("penitipan").doc(id).delete();
    return product;
}

export async function updateProduct(product: Product) {
    await db.collection("products").doc(product.id_product).update(product);
    return product;
}

