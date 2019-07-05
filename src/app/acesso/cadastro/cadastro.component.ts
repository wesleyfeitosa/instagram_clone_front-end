import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { Usuario } from '../usuario.model'
import { Autenticacao } from '../../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public erroMessage: string;

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(private auth: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelLogin(){
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(){
    // console.log(this.formulario);

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );
    this.auth.cadastrarUsuario(usuario)
    .then(() => {

      if(this.erroMessage !== undefined){
        this.auth.message = undefined;
      }

      this.erroMessage = this.auth.message;
      console.log(this.erroMessage);
      
      if(this.erroMessage === undefined){
        this.exibirPainelLogin()
        this.erroMessage = undefined;
      } 
    });
  }
}
