import { OrderDiscount } from '../../src/domain/entities/OrderDiscount'
import { Order } from '../../src/domain/entities/Order'

test('should not be able to create a order using an invalid cpf', () => {
    const cpf = '0000000000'
    expect(() => { new Order(cpf) }).toThrow(new Error('Invalid CPF'))
})

test('should be able to create an 3 item order', () => {
    const cpf = '77827841236'
    const order = new Order(cpf)
    order.addItem('1', 1000, 2)
    order.addItem('2', 800, 1)
    order.addItem('3', 300, 4)
    const total = order.getTotal()
    expect(total).toBe(4000)
})

test('should be able to create an order using discount', () => {
    const cpf = '77827841236'
    const order = new Order(cpf)
    order.addItem('1', 1000, 2)
    order.addItem('2', 800, 1)
    order.addItem('3', 300, 4)
    order.addDiscount(new OrderDiscount('20D88SS', 20, new Date('2022-10-10')))
    const total = order.getTotal()
    expect(total).toBe(3200)
})

test('should be able to create an order using an expired discount', () => {
    const cpf = '77827841236'
    const order = new Order(cpf)
    order.addItem('1', 1000, 2)
    order.addItem('2', 800, 1)
    order.addItem('3', 300, 4)
    order.addDiscount(new OrderDiscount('20D88SS', 20, new Date('2021-10-10')))
    const total = order.getTotal()
    expect(total).toBe(4000)
})