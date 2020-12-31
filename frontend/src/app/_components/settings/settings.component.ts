import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/_models/Alert';
import { ShoppingList } from 'src/app/_models/ShoppingList';
import { AlertService } from 'src/app/_services/alert.service';
import { ShoppingListsService } from 'src/app/_services/shopping-lists.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public lists: ShoppingList[];
  public selectedList: ShoppingList;

  constructor(private listService: ShoppingListsService,
              private alertService: AlertService) {}

  ngOnInit(): void {
    this.listService.listsSubject.subscribe({
      next: (lists) => {
        this.lists = lists;
      },
    });
  }
  onSelect(list: ShoppingList){
    this.selectedList = list;
  }
  onFocusOut(){
    console.log("fire");
    console.log(this.selectedList);
    this.listService.updateShoppingLists(this.selectedList).subscribe({
      next: ()=>{
        this.alertService.success("List renamed", {autoClose: true})
      }
    });
    
  }
}
