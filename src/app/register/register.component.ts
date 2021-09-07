import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService: AuthenticationService,private _formBuilder: FormBuilder, private _router: Router) { }

  public registerForm: any
  public msg: String = ""
  ngOnInit(): void {
    this.registerForm =  this._formBuilder.group({
      name : new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email : new FormControl("",
        [
          Validators.required,
          Validators.email
        ]),
      password : new FormControl("", [
        Validators.required,
      ]),
      cpassword : new FormControl("", [
        Validators.required,
      ])
    })

    this.registerForm.get("cpassword").valueChanges.subscribe((confirmation:any)=>{
      if(this.registerForm.get('password').value !== confirmation){
        this.msg = "Password & Confirm Password don't match."
      }else{
        this.msg = ""
      }
    })

  }

  public error : String =""
  onSubmit(){
    this._authService.registerUser(this.registerForm.value).subscribe((response:any)=>{
      if(response.Success){
        this.error = ""
        this._router.navigate(["/login"])
      } else{
        this.error = response.error
      }
    })
  }

}
