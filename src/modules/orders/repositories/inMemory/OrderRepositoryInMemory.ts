import { Order } from "../../entities/Order";
import { IOrderRepository } from "../IOrderRepository";

export class OrderRepositoryInMemory implements IOrderRepository{
    orders: Order[]

    constructor(){
        this.orders = []
    }

    save(order: Order): void {
        this.orders.push(order)
    }

}