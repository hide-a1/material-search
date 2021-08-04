import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'functions/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUser(uid: string): Observable<User | undefined> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }
}
