import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingList } from 'src/app/_models/ShoppingList';
import { User } from 'src/app/_models/User';
import { ShoppingListsService } from 'src/app/_services/shopping-lists.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  public owner: User;
  public sharedList: ShoppingList;

  constructor(
    private route: ActivatedRoute,
    private listService: ShoppingListsService
  ) {}

  ngOnInit(): void {
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
  addList() {
    this.listService.createNewList(this.sharedList).subscribe({
      next: (data) => {
        console.log('done', data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
