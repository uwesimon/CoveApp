import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  hide = true;
  loginError = false;
  retUrl: string = "home";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
//        console.dir(params);
        this.retUrl = params.get('returnUrl');
        console.log('LoginComponent/ngOnInit ' + this.retUrl);
      });
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  doCancel() {
    this.router.navigate([this.retUrl || '/']);
  }

  doRegister() {
    console.log('register')
  }

  doLogin() {
    let credentials = this.loginForm.value;
    this.loginError = false;  

    alert(`login ${credentials.username} ${credentials.password}`);
  }
}
