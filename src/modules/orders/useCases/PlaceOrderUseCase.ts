import { PlaceOrderPayloadDTO, PlaceOrderPayloadResponse } from "../dtos/PlaceOrderDTO";
import { FreightCalculator } from "../entities/FreightCalculator";
import { Item } from "../entities/Item";
import { Order } from "../entities/Order";
import { OrderDiscount } from "../entities/OrderDiscount";

export class PlaceOrderUseCase {
    discount: OrderDiscount[]
    orders: Order[]
    items: Item[]

    constructor() {
        this.discount = [
            new OrderDiscount('20D88SS', 10, new Date('2022-10-10')),
            new OrderDiscount('20D88SS-Expired', 10, new Date('2021-10-10')),
        ]
        this.items = [
            new Item('1', 'Guitar', 1000, 50,50,50,22)
        ]
        this.orders = []
    }

    execute(payload: PlaceOrderPayloadDTO): PlaceOrderPayloadResponse {
        const order = new Order(payload.cpf)
        payload.items.forEach((orderItem) => {
            const item = this.items.find(item=> item.id === orderItem.id)
            if(!item) throw new Error('Item not found')
            order.addItem(orderItem.id, item.price, orderItem.quantity)
            order.freight += FreightCalculator.calculate(1000, item) * orderItem.quantity
        })

        if (payload.discount) {
            const discount = this.discount.find(discount => discount.code === payload.discount)
            if (discount) order.addDiscount(discount)
        }

        const total = order.getTotal()
        this.orders.push(order)

        return {
            total,
            freight: order.freight
        }
    }
}