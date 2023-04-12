import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user_profile = new BehaviorSubject('');
  user_name = this.user_profile.asObservable();

  public show_Btn = new BehaviorSubject(false);
  show = this.show_Btn.asObservable();

  constructor() {}

  getUserName(name: any) {
    this.user_profile.next(name);
  }

  loggedIn(value: boolean) {
    this.show_Btn.next(value);
  }
}
