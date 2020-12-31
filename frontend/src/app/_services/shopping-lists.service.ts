import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { ShoppingList } from '../_models/ShoppingList';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListsService {
  lists: Array<ShoppingList>;
  constructor(private http: HttpClient) {}

  getShoppingLists() {
    this.http.get(environment.apiUrl + '/lists').subscribe();
  }

  updateShoppingLists(newList: ShoppingList, userID: String) {
    return this.http.put(environment.apiUrl + '/lists', { list: newList });
  }
}
