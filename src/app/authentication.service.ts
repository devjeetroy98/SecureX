import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public baseURL = "http://localhost:3000/"

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 

  public registerUser(data:any){
      delete data.cpassword
      return this.http.post(this.baseURL + "register-user", data).pipe(
      catchError(this.handleError('registerUser', []))
    ) 
  }

  public loginUser(data:any){
    return this.http.post(this.baseURL + "login-user", data).pipe(
    catchError(this.handleError('login', []))
  ) 
  }

  public getDashboard(token:any){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get(this.baseURL + "get-user", httpOptions)
  }

  public signout(){
    return this.http.post(this.baseURL + "logout", [])
  }


  public isLoggedIn = false

  setIsLoggedIn(value:any){
    this.isLoggedIn = value
  }

  getLoggedIn(){
    return this.isLoggedIn
  }
}
