import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any) {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {

                let nomeImagem = resposta.key;

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
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            //consultar as publicações
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    // console.log(snapshot.val());
                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val();
                        publicacao.key = childSnapshot.key;

                        publicacoes.push(publicacao)
                    })
                    // resolve(publicacoes);
                    return publicacoes.reverse();
                })
                .then((publicacoes) => {
                    // console.log(publicacoes);

                    publicacoes.forEach((publicacao) => {


                        //consultar a url da imagem
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {

                                publicacao.url_imagem = url;

                                //consultar o nome de usuario
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().usuario.nome_usuario;
                                    })
                            })
                    })
                    resolve(publicacoes);
                })
        })
    }
}