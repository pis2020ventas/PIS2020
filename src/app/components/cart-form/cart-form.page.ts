import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.page.html',
  styleUrls: ['./cart-form.page.scss'],
})
export class CartFormPage implements OnInit {

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}
  public errorMessages = {
    nombre: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'maxlength', message: 'El nombre no puede tener una longitud mayor a 100 carácteres.' }
    ],
  
    telefono: [
      { type: 'required', message: '   El número de télefono es obligatorio' },
      { type: 'pattern', message: '    Porfavor ingrese un número válido de teléfono' }
    ],
    ubicacion: [
      { type: 'required', message: 'La calle es obligaroria' },
      { type: 'maxlength',message: 'El nombre de la calle no puede tener una longitud mayor a 100 carácteres.'}
    ],
    nit: [
      { type: 'required', message: 'El número de NIT es obligatorio' },
      {
        type: 'maxlength',
        message: 'El nombre de la calle no puede tener una longitud mayor a 8 carácteres.'
      }
    ],
   
  };
  registrationForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    nit: ['',[Validators.required, Validators.maxLength(10)]
    ],
    ubicacion: ['', [Validators.required, Validators.maxLength(100)]],

  });
  public submit() {
    console.log(this.registrationForm.value);
  }
}
