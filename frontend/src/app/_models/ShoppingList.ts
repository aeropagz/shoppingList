import { StringifyOptions } from "querystring";
import { ShoppingItem } from "./ShoppingItem";

export class ShoppingList {
    listID: String;
    shop: String;
    items: Array<ShoppingItem>
}