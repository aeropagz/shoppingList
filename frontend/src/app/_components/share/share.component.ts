import { error } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShoppingList } from 'src/app/_models/ShoppingList';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ShoppingListsService } from 'src/app/_services/shopping-lists.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit, OnDestroy {
  public owner: User;
  public sharedList: ShoppingList;
  public user: User;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private listService: ShoppingListsService,
    private accountService: AccountService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (user: User) => {
        this.user = user;
      },
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.listService.getList(id).subscribe({
      next: (data) => {
        console.log(data);

        this.owner = data['owner'];
        this.sharedList = data['list'];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  done() {
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addList() {
    this.listService.createNewList(this.sharedList).subscribe({
      next: () => {
        this.alertService.success(`List ${this.sharedList.shop} added`, {
          autoClose: true,
          keepAfterRouteChange: true,
        });
        this.done();
      },
      error: (error) => {
        const message = error.error ? error.error.message : error.message;
        this.alertService.error(message, { keepAfterRouteChange: true });
        console.error(error);
        this.done();
      },
    });
  }
}
