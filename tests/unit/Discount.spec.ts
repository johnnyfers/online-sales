import { OrderDiscount } from "../../src/domain/entities/OrderDiscount";

test('verify experied discounts', () => {
    const discount = new OrderDiscount('AAA111', 10, new Date('2021-10-10'))
    expect(discount.isExpired()).toBe(true)
})