import { OnInit } from '@angular/core';
import { Component} from '@angular/core';
import { Router } from "@angular/router"
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router : Router, private _auth: AuthenticationService) { }

  public loggedIn : any

  ngOnInit(): void { 
    this.loggedIn = !!localStorage.getItem("token")
    console.log("==>>",this.loggedIn)
  } 
  
  public logout(){
    this._auth.signout().subscribe((resp:any)=>{
      if(resp.Success){
        localStorage.clear()
        this._router.navigate(["/login"]);
      }
    })
    
  }

  public getState(){
    return this.loggedIn
  }

}
