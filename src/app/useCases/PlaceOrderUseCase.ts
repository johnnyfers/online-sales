import { ZipCodeCalculatorAPI } from "src/domain/gateway/ZipCodeCalculatorAPI";
import { ZipCodeCalculatorAPIMemory } from "../../infra/gateway/inMemory/ZipCodeCalculatorAPIMemory";
import { PlaceOrderPayloadDTO, PlaceOrderPayloadResponse } from "../dtos/PlaceOrderDTO";
import { FreightCalculator } from "../../domain/services/FreightCalculator";
import { Order } from "../../domain/entities/Order";
import { IDiscountRepository } from "../../domain/repositories/IDiscountRepository";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";

export class PlaceOrderUseCase {
    zipCodeCalculatorAPI: ZipCodeCalculatorAPIMemory
    itemRepository: IItemRepository
    discountRepository: IDiscountRepository
    orderRepository: IOrderRepository

    constructor(itemRepository: IItemRepository, discountRepository: IDiscountRepository, orderRepository: IOrderRepository, zipCodeCalculatorAPI: ZipCodeCalculatorAPI) {
        this.itemRepository = itemRepository
        this.discountRepository = discountRepository
        this.orderRepository = orderRepository
        this.zipCodeCalculatorAPI = zipCodeCalculatorAPI
    }

    execute(payload: PlaceOrderPayloadDTO): PlaceOrderPayloadResponse {
        const order = new Order(payload.cpf)
        const distance = this.zipCodeCalculatorAPI.calculate(payload.zipCode, '22222222')
        payload.items.forEach((orderItem) => {
            const item = this.itemRepository.getById(orderItem.id)
            if (!item) throw new Error('Item not found')
            order.addItem(orderItem.id, item.price, orderItem.quantity)
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity
        })

        if (payload.discount) {
            const discount = this.discountRepository.getByCode(payload.discount)
            if (discount) order.addDiscount(discount)
        }

        const total = order.getTotal()
        this.orderRepository.save(order)

        return {
            total,
            freight: order.freight
        }
    }
}