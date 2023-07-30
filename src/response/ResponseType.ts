
type ResponseOk = {
    code: number,
    status: string,
    message: string,
    data: object,
}

type ResponseErr = Omit<ResponseOk, "data">;

export { ResponseOk, ResponseErr };
