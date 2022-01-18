import { OrderRepositoryInMemory } from "../../src/infra/repositories/inMemory/OrderRepositoryInMemory"
import { DiscountRepositoryInMemory } from "../../src/infra/repositories/inMemory/DiscountRepositoryInMemory"
import { ItemRepositoryInMemory } from "../../src/infra/repositories/inMemory/ItemRepositoryInMemory"
import { PlaceOrderUseCase } from "../../src/app/useCases/PlaceOrderUseCase"
import { ZipCodeCalculatorAPIMemory } from "../../src/infra/gateway/inMemory/ZipCodeCalculatorAPIMemory"

test('Should be able to order with discount', () => {
    const payload = {
        cpf: '77827841236',
        zipCode: '11111111',
        items: [
            { id: '1', quantity: 1 }
        ],
        discount: '20D88SS'
    }
    const itemRepository = new ItemRepositoryInMemory()
    const discountRepository = new DiscountRepositoryInMemory()
    const orderRepository = new OrderRepositoryInMemory()
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory()
    const placeOrderUseCase = new PlaceOrderUseCase(itemRepository, discountRepository, orderRepository, zipCodeCalculatorAPI)
    const placeOrderUseCaseResponse = placeOrderUseCase.execute(payload)
    expect(placeOrderUseCaseResponse.total).toBe(900.22)
})

test('Should be able to order with an expired discount', () => {
    const payload = {
        cpf: '77827841236',
        zipCode: '11111111',
        items: [
            { id: '1', quantity: 1 }
        ],
        discount: '20D88SS-Expired'
    }
    const itemRepository = new ItemRepositoryInMemory()
    const discountRepository = new DiscountRepositoryInMemory()
    const orderRepository = new OrderRepositoryInMemory()
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory()
    const placeOrderUseCase = new PlaceOrderUseCase(itemRepository, discountRepository, orderRepository, zipCodeCalculatorAPI)
    const placeOrderUseCaseResponse = placeOrderUseCase.execute(payload)
    expect(placeOrderUseCaseResponse.total).toBe(1000.22)
})

test('Should be able to order with freight calculation', () => {
    const payload = {
        cpf: '77827841236',
        zipCode: '11111111',
        items: [
            { id: '1', quantity: 1 }
        ],
        discount: '20D88SS-Expired'
    }
    const itemRepository = new ItemRepositoryInMemory()
    const discountRepository = new DiscountRepositoryInMemory()
    const orderRepository = new OrderRepositoryInMemory()
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory()
    const placeOrderUseCase = new PlaceOrderUseCase(itemRepository, discountRepository, orderRepository, zipCodeCalculatorAPI)
    const placeOrderUseCaseResponse = placeOrderUseCase.execute(payload)
    expect(placeOrderUseCaseResponse.freight).toBe(0.22)
})

