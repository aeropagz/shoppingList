import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private listService: ShoppingListsService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listService.listsSubject.subscribe({
      next: (lists) => {
        this.lists = lists;
      },
    });

    this.form = this.formBuilder.group({
      shop: ['', Validators.required],
      color: [
        this.selectedList ? this.selectedList.color : '',
        Validators.required,
      ],
    });
  }
  onSelect(list: ShoppingList) {
    this.selectedList = list;
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
    });
  }
}
