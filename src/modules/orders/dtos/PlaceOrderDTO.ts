import { OrderItem } from "../entities/OrderItem"

export type PlaceOrderPayloadDTO = {
    cpf: string
    zipCode: string
    items: {
        id: string
        quantity: number
    }[]
    discount: string
}

export type PlaceOrderPayloadResponse = {
    total: number
    freight: number
}