import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd{

    constructor(private progresso: Progresso){}
    
    public publicar(publicacao: any){

        let nomeImagem = Date.now();
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                //Acompanhamento do progresso do upload
                (snapshot: any) => {
                    this.progresso.status = 'endamento';
                    this.progresso.estado = snapshot;
                },
                (error) => {
                    this.progresso.status = 'erro';
                },
                () => {
                    //finalização do projeto
                    this.progresso.status = 'concluido';
                }
            );


        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo });

        console.log('Chegamos até o serviço de controle de dados!');
    }
}