import { OrderDiscount } from "../../entities/OrderDiscount";
import { IDiscountRepository } from "../IDiscountRepository";

export class DiscountRepositoryInMemory implements IDiscountRepository {
    discount: OrderDiscount[]

    constructor(){
        this.discount = [
            new OrderDiscount('20D88SS', 10, new Date('2022-10-10')),
            new OrderDiscount('20D88SS-Expired', 10, new Date('2021-10-10')),
        ]
    }
    getByCode(code: string): OrderDiscount {
        return this.discount.find(discount => discount.code === code)
    }

}