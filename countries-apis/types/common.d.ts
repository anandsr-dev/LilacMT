export interface EApiResponse<T> {
    status: "success" | "failure",
    message: string,
    data?: {
        item?: T,
        items?: T[]
    }
};