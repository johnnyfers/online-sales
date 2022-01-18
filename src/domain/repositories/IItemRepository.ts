import { Item } from "../entities/Item";

export interface IItemRepository {
    getById(id: string): Item | undefined
}