import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShoppingList } from 'src/app/_models/ShoppingList';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ShoppingListsService } from 'src/app/_services/shopping-lists.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnDestroy, OnInit {
  public lists: ShoppingList[];
  public user: User;
  public selectedList: ShoppingList;
  private ngUnsubscribe = new Subject();
  public shareLink: String;
  public copied: boolean;
  form: FormGroup;
  newListForm: FormGroup;

  constructor(
    private listService: ShoppingListsService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private accountService: AccountService
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

    this.accountService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (user) => {
        this.user = user;
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
        this.alertService.success('New list created', { autoClose: true });
        this.listService.getShoppingLists();
        this.newListForm.reset;
        this.newListForm.controls.newColor.setValue('#d6d6d6');
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

  generateLink() {
    const baseEncodedID = encodeURIComponent(btoa(this.selectedList.listID));
    this.shareLink = `${environment.ownUrl}/share/${baseEncodedID}`;
    this.copied = false;
  }
  copy() {
    this.copied = true;
  }
}
