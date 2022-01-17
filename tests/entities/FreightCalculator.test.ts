import { FreightCalculator } from "../../src/modules/orders/entities/FreightCalculator"
import { Item } from "../../src/modules/orders/entities/Item"

test('Should be able to calculate items freight', () => {
    const item = new Item('1', 'Guitar', 5000, 50, 50, 50, 22)
    const distanceKm = 1000
    const price = FreightCalculator.calculate(distanceKm, item)
    expect(price).toBe(220)
})