import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router'
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthenticationService,private _formBuilder: FormBuilder, private _router: Router, private _nav: NavbarComponent) { }

  loginForm: any
  ngOnInit(): void {

    this.loginForm =  this._formBuilder.group({
      email : new FormControl("",
        [
          Validators.required,
          Validators.email
        ]),
      password : new FormControl("", [
        Validators.required,
      ])
    })

  }

  onSubmit(){
    this._authService.loginUser(this.loginForm.value).subscribe((response:any)=>{
      console.log(response)
      if(response){
        localStorage.setItem("token" , response.token)
        this._authService.setIsLoggedIn(true)
        this._nav.ngOnInit()
        this._router.navigate(["/dashboard"]);
      }else{
        this._router.navigate(["/register"]);
      }
        
    })
  }
}
