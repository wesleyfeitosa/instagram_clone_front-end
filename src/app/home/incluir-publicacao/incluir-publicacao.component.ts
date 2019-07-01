import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from "firebase";
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, Subject } from 'rxjs';
import { map, tap, takeUntil} from 'rxjs/operators'; 
import 'rxjs';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  private imagem: any;
  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(){
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let continua = new Subject();
    continua.next(true);

    let acompanhamentoUpload = interval(1500)

    acompanhamentoUpload.pipe(takeUntil(continua))
      .subscribe(() => {
        console.log(this.progresso.status);
        console.log(this.progresso.estado);
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

        if(this.progresso.status === 'concluido'){
          this.progressoPublicacao = 'concluido';
          continua.next(false);
        }
      })

  }

  public preparaImagemUpload(event: Event){
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
