import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User, UserRole} from "../../models/user.models";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {LoginObject, RegisterObject, RegisterResponse} from "../../models/auth.models";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl = environment.apiUrl + '/auth';
  private userNameSubject = new Subject<User | null>(); // Estado inicial
  userName$ = this.userNameSubject.asObservable(); // Exposição do Observable

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public registerUser(email: string, password: string) : Observable<RegisterResponse>{
    const user: RegisterObject = {
      emailUser: email,
      password: password,
      roleUser: UserRole.USER
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    const url = `${this.apiurl}/register`;

    return this.http.post<RegisterResponse>(url, user, httpOptions);
  }

  public loginUser(email: string, password: string) : Observable<User>{
    const login: LoginObject = {
      emailUser: email,
      password: password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    const url = `${this.apiurl}/login`;

    return this.http.post<User>(url, login, httpOptions);
  }

  public logoutUser(){
    this.authenticated(null);
    localStorage.removeItem('auth');
  }

  public setAuth(token: string, emailUser: string, roleUser: UserRole){
    localStorage.setItem('auth', JSON.stringify({token, emailUser, roleUser}));
  }

  public getAuth() : User{
    return JSON.parse(localStorage.getItem('auth')!);
  }

  authenticated(auth: User | null) {
    this.userNameSubject.next(auth);
  }

  isAuthenticated() {
    return !!localStorage.getItem('auth');
  }

  validateToken(): Observable<boolean> {
    const token = this.getAuth()?.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    const url = `${this.apiurl}/validate`;
    return this.http.get<boolean>(url, httpOptions)
  }


}
