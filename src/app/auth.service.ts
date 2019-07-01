import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

    public token_id: string;
    public message: string;

    constructor(private router: Router){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o seriviço', usuario);
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                //remover o atributo senha do objeto usuario
                delete usuario.senha;

                //registrando dados complementares do usuário no path email na base 64 
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario })
            })
            .catch((error: Error) => {
                this.message = error.message;
            });
    }

    public autenticar(email: string, senha: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home']);
                    })
            })
            .catch((erro: Error) => {
                this.message = erro.message;
            })
    }

    public autenticado(): boolean{

        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken');
        }

        if(this.token_id === undefined){
            this.router.navigate(['/']);
        }

        return this.token_id !== undefined;
    }

    public sair(){
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.router.navigate(['/']);
            });
    }
}