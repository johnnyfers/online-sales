import { CPF } from './CPF'
import { OrderDiscount } from './OrderDiscount'
import { OrderItem } from './OrderItem'

export class Order {
    cpf: CPF
    items: OrderItem[]
    freight: number
    discount?: OrderDiscount

    constructor(cpf: string) {
        this.cpf = new CPF(cpf)
        this.items = []
        this.freight = 0
    }

    addItem(id: string, price: number, quantity: number) {
        this.items.push(new OrderItem(id, price, quantity))
    }

    getTotal() {
        let total = 0
        this.items.forEach((orderItem: OrderItem) => {
            total += orderItem.getTotal()
        })
        if(this.discount){
            total -= (total * this.discount.percentage)/100
        }
        total += this.freight
        return total
    }

    addDiscount(discount: OrderDiscount) {
        if(!discount.isExpired()){
            this.discount = discount
        }
    }
}