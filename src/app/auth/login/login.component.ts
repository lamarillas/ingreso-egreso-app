import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  // styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  /**
   *
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // super();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  } 

  login() {
    if(this.loginForm.invalid)
      return;

    const { email, password} = this.loginForm.value;

    Swal.fire({
      title: "Espere porfavor.",
      
      didOpen: () => {
        Swal.showLoading();
      }
    });


    this.authService.loginUsuario(email, password)
      .then((credentials) => {
        // console.log('Logeado ', credentials);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="#">Why do I have this issue?</a>'
      }));
   }

}
