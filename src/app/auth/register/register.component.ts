import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) {
    //super();
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });   
  }

  crearUsuario() {
    console.log(this.registroForm);
    console.log(this.registroForm.invalid);
    console.log(this.registroForm.value);
  }

}
