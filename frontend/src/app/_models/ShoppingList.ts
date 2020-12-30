import { StringifyOptions } from "querystring";
import { ShoppingItem } from "./ShoppingItem";

export class ShoppingList {
    id: String;
    shop: String;
    items: Array<ShoppingItem>
}