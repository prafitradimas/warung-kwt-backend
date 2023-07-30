
interface LoginRequest {
    username: string,
    password: string
}

interface CreateProductRequest {
    nama: string,
    supplier_id: string,
    jenis: string,
    harga: number,
    jumlah: number
}

interface CreateSupplierRequest {
    username: string,
    password: string,
    nama: string,
    email: string,
    no_hp: string,
    alamat: string
}

export {
    LoginRequest,
    CreateProductRequest,
    CreateSupplierRequest,
}
