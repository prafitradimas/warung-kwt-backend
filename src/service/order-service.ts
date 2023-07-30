
import { randomUUID } from "crypto"
import { Product } from "./product-service.js"
import { db } from "../application/database.js"
import { Supplier } from "./supplier-service.js"

type OrderItem = {
    id_product: string,
    nama: string,
    jenis: string,
    harga: number,
    fee: number
}

export type History_Penjualan = {
    id_penjualan: string,
    id_supplier: string,
    tgl_penjualan: string,
    barang: OrderItem,
    jumlah_terjual: number,
    total_harga: number,
    fee: number,
    tarik: boolean
}

export type Penjualan = {
    pemasukan: number,
    total_pemasukan: number,
    history_penjualan: History_Penjualan[]
}

export type OrderRequest = {
    id_supplier: string,
    barang: OrderItem,
    jumlah: number,
    total_harga: number
}

export async function createOrder(request: OrderRequest) {
    const str_id = randomUUID().toString();
    const penjualan: History_Penjualan = {
        id_penjualan: str_id,
        id_supplier: request.id_supplier,
        tgl_penjualan: new Date().toString(),
        barang: request.barang,
        jumlah_terjual: request.jumlah,
        total_harga: request.total_harga,
        fee: (request.barang.fee * request.jumlah),
        tarik: true
    }

    console.log(`new order: ${str_id}`);
    const product: Product = (await db.collection("products").doc(penjualan.barang.id_product).get()).data() as Product;
    product.sisa = product.sisa - request.jumlah;

    const doc_supplier = (await db.collection('suppliers').doc(penjualan.id_supplier).get()).data() as Supplier;
    doc_supplier.history_penjualan.push(penjualan);

    const doc_penjualan = (await db.collection('warung').doc("penjualan").get()).data() as Penjualan;
    doc_penjualan.pemasukan = doc_penjualan.pemasukan + penjualan.fee;
    doc_penjualan.total_pemasukan = doc_penjualan.total_pemasukan + penjualan.fee;
    doc_penjualan.history_penjualan.push(penjualan);

    await db.collection("suppliers").doc(penjualan.id_supplier).update(doc_supplier);
    await db.collection("warung").doc("penjualan").update(doc_penjualan);
    await db.collection("products").doc(penjualan.barang.id_product).update(product);
    return penjualan;
}

export async function getDataPenjualan(): Promise<Penjualan> {
    return (await db.collection('warung').doc('penjualan').get()).data() as Penjualan;
}