import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { mustMatch } from 'src/app/validatorFuncs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    });
    this.form.setValidators(mustMatch('password', 'password2'));
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form);

      return;
    }
    this.loading = true;
    this.accountService
      .registerUser(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            'Registration successfull, check your Email for Activation',
            {
              keepAfterRouteChange: true,
            }
          );
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.log(error);
          this.alertService.error(error.error.msg, { autoClose: true });
          this.loading = false;
        },
      });
  }
}
