import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';
import { ShoppingListsService } from './_services/shopping-lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goLocal';
  user: User;

  constructor(private accountService: AccountService,
              private listService: ShoppingListsService){
    this.accountService.user.subscribe(x=>this.user = x);
  }
  logout(){
    this.listService.clearList();
    this.accountService.logout();
  }
}
