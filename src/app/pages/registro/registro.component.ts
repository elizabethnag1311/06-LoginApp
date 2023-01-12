import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;

  constructor( private auth: AuthService,
               private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit( form: NgForm){

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.usuarioNuevo( this.usuario )
    .subscribe( resp => {
      console.log(resp);

      Swal.close();
      this.router.navigateByUrl('/home');

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Ya existe una cuenta con este Email',
        text: err.error.error.message
      });
    });
  }

}
