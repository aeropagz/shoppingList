import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  private activationKey: string;
  public result: boolean;
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.activationKey = this.route.snapshot.paramMap.get('id');
    this.accountService.activateUser(this.activationKey).subscribe({
      next: () => {
        this.result = true;
      },
      error: (error) => {
        this.result = false;
        console.error(error);
        let message = error.error || error.message;
        this.alertService.error(message);
      },
    });
  }
}
