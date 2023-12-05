import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registroForm: FormGroup;


  /**
   *
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    //super();
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });   
  }

  crearUsuario() {

    if(this.registroForm.invalid) return;

    const {nombre, correo, password} = this.registroForm.value;

    Swal.fire({
      title: "Espere porfavor.",
      
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        // console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(error => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="#">Why do I have this issue?</a>'
      }));
    // console.log(this.registroForm);
    // console.log(this.registroForm.invalid);
    // console.log(this.registroForm.value);
  }

}
