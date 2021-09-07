import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _service : AuthenticationService, private _router : Router, private _nav:NavbarComponent) { }

  public username:any
  public email: any


  ngOnInit(): void {
    let data = localStorage.getItem("token") || ""
    
    this._service.getDashboard(data).subscribe((res:any)=>{
      if(res){
        
        this.username = res.name
        this.email = res.email
      }else{
        this._router.navigate(["/login"]);
      }
    })
  }

}
