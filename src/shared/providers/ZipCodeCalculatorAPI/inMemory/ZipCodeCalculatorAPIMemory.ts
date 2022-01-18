import { ZipCodeCalculatorAPI } from "../ZipCodeCalculatorAPI";

export class ZipCodeCalculatorAPIMemory implements ZipCodeCalculatorAPI {
    calculate(zipCodeA: string, zipCodeB: string): number {
        return 1000
    }

}