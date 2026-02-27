import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/users';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.api}?username=${username}`).pipe(
      map((users) => {
        if (users.length) {
          if (users[0].password === password) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(users[0]));
            return users[0];
          }
        }
        return null;
      }),
    );
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getRole(): string | null {
    return this.getCurrentUser()?.role || null;
  }
}
