import { Order } from "../../../domain/entities/Order";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";

export class OrderRepositoryInMemory implements IOrderRepository{
    orders: Order[]

    constructor(){
        this.orders = []
    }

    save(order: Order): void {
        this.orders.push(order)
    }

}