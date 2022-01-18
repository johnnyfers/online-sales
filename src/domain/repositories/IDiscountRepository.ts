import { OrderDiscount } from "../entities/OrderDiscount";

export interface IDiscountRepository {
    discount: OrderDiscount[]

    getByCode(code: string): OrderDiscount | undefined
}