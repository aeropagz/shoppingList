import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Alert } from 'src/app/_models/Alert';
import { ShoppingList } from 'src/app/_models/ShoppingList';
import { AlertService } from 'src/app/_services/alert.service';
import { ShoppingListsService } from 'src/app/_services/shopping-lists.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnDestroy, OnInit {
  public lists: ShoppingList[];
  public selectedList: ShoppingList;
  form: FormGroup;
  newListForm: FormGroup;
  private ngUnsubscribe = new Subject();

  constructor(
    private listService: ShoppingListsService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.listService.listsSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (lists) => {
          this.lists = lists;
        },
      });

    this.form = this.formBuilder.group({
      shop: ['', Validators.required],
      color: ['', Validators.required],
    });

    this.newListForm = this.formBuilder.group({
      newShop: ['', Validators.required],
      newColor: ['#d6d6d6', Validators.required],
    });
  }
  onSelect(list: ShoppingList) {
    this.selectedList = list;
    if (list) {
      this.form.setValue({
        shop: this.selectedList.shop,
        color: this.selectedList.color,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.selectedList.color = this.form.controls.color.value;
    this.selectedList.shop = this.form.controls.shop.value;
    this.listService.updateShoppingLists(this.selectedList).subscribe({
      next: () => {
        this.alertService.success('List changed', { autoClose: true });
      },
      error: (error) => {
        console.log(error);
        this.alertService.error(error);
      },
    });
  }

  createNewList() {
    if (this.newListForm.invalid) {
      return;
    }

    this.listService.createNewList(this.newListForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.success('new List created', { autoClose: true });
        this.listService.getShoppingLists();
      },
      error: (error) => {
        console.log(error);
        this.alertService.error(error.error);
      },
    });
  }

  deleteList(list: ShoppingList) {
    this.selectedList = null;
    this.listService.deleteList(list).subscribe({
      next: () => {
        this.alertService.success('List deleted', { autoClose: true });
        this.listService.getShoppingLists();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
