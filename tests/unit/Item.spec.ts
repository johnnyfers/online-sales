import { Item } from "../../src/domain/entities/Item"

test('should be able to calculate items volume', () => {
    const item = new Item('1', 'Guitar', 5000, 50,50,50,22)
    const volume = item.getVolume()
    expect(volume).toBe(0.125)
})

test('should be able to calculate items density', () => {
    const item = new Item('1', 'Guitar', 5000, 50,50,50,22)
    const volume = item.getDensity()
    expect(volume).toBe(176)
})