import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseurl="http://localhost:9000/api/v1";

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  username:string;
  password:string;

  constructor(private http:HttpClient) { }
  
  registerUser(user:User):Observable<Object>
  {
    return this.http.post(`${this.baseurl}/register`,user);
  }

  authenticationService(username:string,password:string)
  {
    
    return this.http.get(`${this.baseurl}/auth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    sessionStorage.setItem('token','Basic '+window.btoa(username+":"+password));
    return 'Basic '+window.btoa(username+":"+password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }

  getAllContacts():Observable<Contact[]>{
    const name=this.getLoggedInUserName();
    return this.http.get<Contact[]>(`${this.baseurl}/contacts?name=${name}`);
  }

  deleteContact(cid:number):Observable<Contact>{
    return this.http.delete<Contact>(`${this.baseurl}/contacts/${cid}`);
  }

  addContact(contact:Contact):Observable<Object>{
    const name=this.getLoggedInUserName();
    return this.http.post(`${this.baseurl}/add?name=${name}`,contact);
  }

  getContact(cid:number):Observable<Contact>{
    return this.http.get<Contact>(`${this.baseurl}/contacts/${cid}`);
  }

  updateContact(contact:Contact,cid:number):Observable<Object>{
    const name=this.getLoggedInUserName();
    return this.http.put(`${this.baseurl}/update/${cid}?name=${name}`,contact);
  }
}
