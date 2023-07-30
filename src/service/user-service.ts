
import { db } from "../application/database.js";

export type User = {
    username: string,
    password: string,
    role: string
}

export async function login_admin(username: string, password: string) {
    const admin = (await db.collection('warung').doc('admin').get()).data();
    if (admin.username !== username || admin.password !== password) {
        throw new Error(`Username atau password salah.`);
    }

    return true;
}

export async function findUserByUsername(username: string): Promise<User> | never {
    const doc = await db.collection('users').doc(username).get();
    if (!doc.exists) {
        throw new Error(`User: ${username} not found.`);
    }
    return doc.data() as User;
}
