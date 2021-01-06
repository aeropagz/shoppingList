import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShoppingListsService } from '../../_services/shopping-lists.service';
import { ShoppingList } from '../../_models/ShoppingList';
import { ShoppingItem } from 'src/app/_models/ShoppingItem';
import { AlertService } from 'src/app/_services/alert.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/User';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public lists: ShoppingList[];
  public user: User;
  form: FormGroup;
  loading = false;
  private ngUnsubscribe = new Subject();

  constructor(
    private listService: ShoppingListsService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.listService.clearList();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [1, Validators.required],
    });

    this.listService.lists.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (lists: ShoppingList[]) => {
        this.lists = lists;
      },
    });
    this.accountService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (user: User) => {
        this.user = user;
      },
    });
    this.listService.getShoppingLists();
  }

  get f() {
    return this.form.controls;
  }

  addItem(currentList) {
    if (this.form.invalid) {
      return;
    }

    let newItem = {
      name: this.f.name.value,
      amount: this.f.amount.value,
      id: uuid.v4(),
    };
    currentList.items.push(newItem);
    this.updateShoppingList(currentList);
    
  }

  deleteItem(list: ShoppingList, deletedItem: ShoppingItem) {
    list.items = list.items.filter((item) => {
      return item.id !== deletedItem.id;
    });
    this.updateShoppingList(list);
  }

  updateShoppingList(list) {
    this.listService.updateShoppingLists(list).subscribe({
      next: () => {
        console.log('Item added');
      },
      error: (error) => {
        console.log(error);
        this.alertService.error('Error', { autoClose: true });
      },
    });
  }

  getLists() {
    this.lists = this.listService.listsValues;
  }
  itemDone(item: ShoppingItem) {
    item.done = !item.done;
  }
}
