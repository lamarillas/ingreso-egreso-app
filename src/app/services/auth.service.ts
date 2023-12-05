import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private fireStore: Firestore) { }

  initListener() {
    authState(this.auth).subscribe(fUser => {
      console.log(fUser);
    });
  }

  crearUsuario(nombre:string, email:string, password:string) {
    // console.log(nombre, email, password);
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        const newUser = new Usuario(user.uid, nombre, email);
        setDoc(doc(this.fireStore, user.uid, 'user'), {...newUser});
      });
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUsuario() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(
        fUser => fUser != null
      )
    );
  }
}
