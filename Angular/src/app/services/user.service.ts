import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userName = new BehaviorSubject('');
  user_name = this.userName.asObservable();

  public userEmail = new BehaviorSubject('');
  user_email = this.userEmail.asObservable();

  public show_Btn = new BehaviorSubject(false);
  show = this.show_Btn.asObservable();

  constructor() {}

  getUserName(name: any) {
    this.userName.next(name);
  }

  getUserEmail(email: any) {
    this.userEmail.next(email);
  }

  loggedIn(value: boolean) {
    this.show_Btn.next(value);
  }
}
