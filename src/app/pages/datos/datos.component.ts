import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  forma: FormGroup;
  clientes: string[] = ['Claro', 'Entel', 'BCP', 'BBVA', 'interbank'];
  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(5), this.noPaolo] ),
        apellido: new FormControl('', [Validators.required,Validators.minLength(5)])
      }),
      pass: new FormControl('', [Validators.required,Validators.minLength(8)]),
      pass2: new FormControl('', [Validators.required,Validators.minLength(8)]),
      cargo: new FormControl('', [Validators.required,Validators.minLength(6)]),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      cliente: new FormControl('', Validators.required),
      vacaciones: new FormControl(false, Validators.required),
      intereses: new FormArray([
        new FormControl('',Validators.required)
      ],Validators.required)
    });

    this.forma.controls.pass2.setValidators([
      Validators.required,
      this.noIgual.bind(this.forma) // this.forma = this
    ]);
   }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.forma);
  }

  agregarIntereses() {
    const intereses = this.forma.controls.intereses as FormArray;
    intereses.push(new FormControl('', Validators.required));
  }

  validarIntereses():boolean{
    const intereses = this.forma.controls.intereses as FormArray;
    console.log('cantidad de intereses: '+intereses.length);
    if(intereses.length>1){
     return false;
    }
    else{
      return true;
    }
  }

  noPaolo(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'Paolo') {
      return { noRicardo: true };
    }
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    const forma: any = this; // this = this.forma
    if(control.value !== forma.controls.pass.value) {
      return { noigual: true };
    }
  }

}
