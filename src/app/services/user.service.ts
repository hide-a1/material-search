import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'functions/interfaces/user';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUser(uid: string): Observable<User | undefined> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  async updateCreator(id: string, data: Partial<User>): Promise<void> {
    return this.db.doc(`users/${id}`).set(
      {
        ...data,
      },
      { merge: true }
    );
  }

  setSearchHistory(uid: string, category: string) {
    return this.db.doc(`users/${uid}/searchHistory/${category}`).set(
      {
        category,
        count: firebase.default.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );
  }
}
