import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelCadastro(){
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(){
    console.log(this.formulario);
  }

}
