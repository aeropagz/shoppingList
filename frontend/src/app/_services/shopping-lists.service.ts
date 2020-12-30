import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {

  constructor(private http: HttpClient) { }

  getShoppingLists(){
    console.log('Get');
    return this.http.get('http://localhost:8080/lists');
  }

}
