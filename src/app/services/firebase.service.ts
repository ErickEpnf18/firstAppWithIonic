import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  addPhoto<Type>(data: Type, path: string){
    const userCollection: AngularFirestoreCollection<Type> =
      this.firestore.collection<Type>(path);
    return userCollection.doc(this.firestore.createId()).set(data);
  }
  createDoc<Type>(data: Type, path: string, id: string) {
    // this is to pointer a firestore collection
    const userCollection: AngularFirestoreCollection<Type> =
      this.firestore.collection<Type>(path);
    // return userCollection.add(data);
    return userCollection.doc(id).set(data);
  }
  createIdDoc(): string {
    return this.firestore.createId();
  }
  deleteDoc(path, id) {
    return this.firestore.collection(path).doc(id).delete();
  }
  updateDoc<Type>(data: Type, path: string, id: string) {
    return this.firestore.collection(path).doc(id).update(data);
  }
  getDoc<Type>(path: string) {
    const doc: AngularFirestoreDocument<Type> = this.firestore.doc<Type>(path);
    // create a observable
    return doc.valueChanges();
  }

  getCollection<Type>(path: string) {
    const usersCollection: AngularFirestoreCollection<Type> =
      this.firestore.collection<Type>(path);
    // return userCollection.add(data);
    return usersCollection.valueChanges();
  }

}
