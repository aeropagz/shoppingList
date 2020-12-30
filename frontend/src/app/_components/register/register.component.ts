import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from '../../_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.loading = true; 
    this.accountService.registerUser(this.form.value)
      .pipe(first())
      .subscribe({
        next: ()=> {
          this.alertService.success('Registration successfull', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/login');
        },
        error: error => {
          this.alertService.error(error.error, {autoClose: true});
          this.loading = false;
        }
      });
  }
}
