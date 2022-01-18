import { Order } from "../entities/Order";

export interface IOrderRepository {
    save(order: Order): void
}