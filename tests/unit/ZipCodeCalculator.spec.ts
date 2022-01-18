import { ZipCodeCalculatorAPIMemory } from "../../src/infra/gateway/inMemory/ZipCodeCalculatorAPIMemory"

test('should be able to calculate distance between two zipCodes', ()=>{
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory()
    const distance = zipCodeCalculatorAPI.calculate('11111111','22222222')
    expect(distance).toBe(1000)
})