import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { ShoppingList } from '../_models/ShoppingList';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListsService {
  listsSubject: BehaviorSubject<ShoppingList[]>;
  lists: Observable<ShoppingList[]>;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.listsSubject = new BehaviorSubject<ShoppingList[]>(null);
    this.lists = this.listsSubject.asObservable();
    this.getShoppingLists();
  }

  public get listsValues(): ShoppingList[] {
    return this.listsSubject.value;
  }

  getShoppingLists() {
    this.http.get<ShoppingList[]>(environment.apiUrl + '/lists').subscribe({
      next: (data) => {
        const lists = data['lists'];
        this.listsSubject.next(lists);
      },
      error: (data) => {
        console.log(data.error);
        this.alertService.error(data.error.message, {
          keepAfterRouteChange: true,
        });
        this.accountService.logout();
      },
    });
  }

  updateShoppingLists(newList: ShoppingList) {
    return this.http.put(environment.apiUrl + '/lists', { list: newList });
  }

  createNewList(newList: ShoppingList) {
    return this.http.post(environment.apiUrl + '/lists', { list: newList });
  }

  clearList() {
    this.listsSubject.next(null);
  }
}
