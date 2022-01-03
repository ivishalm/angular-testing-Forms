import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MyService } from './my-service';

@Component({
  selector: 'hello',
  template: `
    <form [formGroup]="userForm" novalidate>
      <input
        class="email-input mat-body-1"
        type="email"
        formControlName="email"
      />
      <button class="subscribe mat-body-2" (click)="subscribeEmail()">
        Subscribe
      </button>
    </form>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class HelloComponent {
  submitted = false;
  error = '';

  constructor(public mySvc: MyService) {}

  userForm: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  subscribeEmail() {
    this.error = '';
    if (this.userForm.controls.email.status === 'VALID') {
      this.mySvc.submitForm(this.userForm.controls.email.value).subscribe(
        (response) => {
          if (response.result && response.result !== 'error') {
            this.submitted = true;
          } else {
            this.error = response.msg;
          }
        },
        (error) => {
          this.error = 'Sorry, an error occurred.';
        }
      );
    }
  }
}
