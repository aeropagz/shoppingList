import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShoppingListsService } from '../../_services/shopping-lists.service';
import { ShoppingList } from '../../_models/ShoppingList';
import { ShoppingItem } from 'src/app/_models/ShoppingItem';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public lists: Array<ShoppingList>;
  userID: string;
  form: FormGroup;
  loading = false;

  constructor(
    private listService: ShoppingListsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [1, Validators.required],
    });

    this.listService.getShoppingLists().subscribe((data) => {
      this.lists = data['lists'];
      this.userID = data['userID'];
      console.log(this.lists);
    });
  }

  get f() {
    return this.form.controls;
  }

  addItem(list) {
    if (this.form.invalid) {
      return;
    }
    list.items.push(this.form.value);
    this.updateShoppingList(list);
  }

  deleteItem(list: ShoppingList, deletedItem: ShoppingItem) {
    list.items = list.items.filter((item) => item.name !== deletedItem.name);
    this.updateShoppingList(list);
  }

  updateShoppingList(list) {
    this.listService.updateShoppingLists(list, this.userID).subscribe({
      next: () => {
        this.alertService.success('Item added', { autoClose: true });
      },
      error: () => {
        this.alertService.error('Item failed', { autoClose: true });
      },
    });
  }
}
