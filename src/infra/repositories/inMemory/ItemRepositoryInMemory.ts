import { Item } from "../../../domain/entities/Item";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";

export class ItemRepositoryInMemory implements IItemRepository {
    items: Item[]

    constructor() {
        this.items = [
            new Item('1', 'Guitar', 1000, 50, 50, 50, 22)
        ]
    }

    getById(id: string): Item {
        return this.items.find(item => item.id === id)
    }

}