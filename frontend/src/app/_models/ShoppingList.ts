import { StringifyOptions } from 'querystring';
import { ShoppingItem } from './ShoppingItem';
import { User } from './User';

export class ShoppingList {
  listID: string;
  shop: string;
  color: string;
  shared: string;
  owner: string;
  items: Array<ShoppingItem>;
  allowedUser: Array<User>;
}
