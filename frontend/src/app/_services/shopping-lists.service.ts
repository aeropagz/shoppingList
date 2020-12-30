import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { ShoppingList } from '../_models/ShoppingList';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListsService {
  constructor(private http: HttpClient) {}

  getShoppingLists() {
    return this.http.get('http://localhost:8080/lists');
  }

  updateShoppingLists(newList: ShoppingList, userID: String) {
    return this.http.put('http://localhost:8080/lists', { list: newList });
  }
}
