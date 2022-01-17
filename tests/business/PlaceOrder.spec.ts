import { PlaceOrderUseCase } from "../../src/modules/orders/useCases/PlaceOrderUseCase"

test('Should be able to order with discount', () => {
    const payload = {
        cpf: '77827841236',
        items: [
            { id: '1', quantity: 1 }
        ],
        discount: '20D88SS'
    }
    const placeOrderUseCase = new PlaceOrderUseCase()
    const placeOrderUseCaseResponse = placeOrderUseCase.execute(payload)
    expect(placeOrderUseCaseResponse.total).toBe(900.22)
})

test('Should be able to order with an expired discount', () => {
    const payload = {
        cpf: '77827841236',
        items: [
            { id:'1', quantity: 1 }
        ],
        discount: '20D88SS-Expired'
    }
    const placeOrderUseCase = new PlaceOrderUseCase()
    const placeOrderUseCaseResponse = placeOrderUseCase.execute(payload)
    expect(placeOrderUseCaseResponse.total).toBe(1000.22)
})


test('Should be able to order with freight calculation', () => {
    const payload = {
        cpf: '77827841236',
        items: [
            { id:'1', quantity: 1 }
        ],
        discount: '20D88SS-Expired'
    }
    const placeOrderUseCase = new PlaceOrderUseCase()
    const placeOrderUseCaseResponse = placeOrderUseCase.execute(payload)
    expect(placeOrderUseCaseResponse.freight).toBe(0.22)
})

