import { Component, OnInit } from '@angular/core';

import { ShoppingListsService } from "../../_services/shopping-lists.service";
import { ShoppingList } from "../../_models/ShoppingList";
import { ShoppingItem } from 'src/app/_models/ShoppingItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lists: Array<ShoppingList>;

  constructor(private listService: ShoppingListsService) { }

  ngOnInit(): void {
    console.log('init');
    
    this.listService.getShoppingLists()
      .subscribe((data) => {
        this.lists = data['lists'];
        console.log(this.lists);
        
      });
  }

}
