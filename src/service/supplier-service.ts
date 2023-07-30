
import { db } from "../application/database.js";
import { History_Penjualan } from "./order-service.js";

export type Supplier = {
    username: string,
    password?: string,
    nama: string,
    email: string,
    no_hp: string,
    alamat: string,
    total_pemasukan?: number,
    history_penarikan_barang?: [],
    history_penambahan_barang?: [],
    history_penjualan?: History_Penjualan[]
}

export async function createSupplier(supplier: Supplier): Promise<Supplier> | never {
    const query = await db.collection('suppliers').doc(supplier.username);
    if ((await query.get()).exists) {
        throw new Error(`Username: ${supplier.username} already taken.`);
    }
    await query.create(supplier);
    return supplier;
}

export async function findSupplierByUsername(id: string): Promise<Supplier> | never {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
        throw new Error(`Supplier: ${id} is not exists.`);
    }
    return doc.data() as Supplier;
}
