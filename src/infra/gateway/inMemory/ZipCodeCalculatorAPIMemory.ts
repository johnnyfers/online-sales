import { ZipCodeCalculatorAPI } from "../../../../src/domain/gateway/ZipCodeCalculatorAPI";

export class ZipCodeCalculatorAPIMemory implements ZipCodeCalculatorAPI {
    calculate(zipCodeA: string, zipCodeB: string): number {
        return 1000
    }

}