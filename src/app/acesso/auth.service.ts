import { Usuario } from './usuario.model';
import * as firebase from 'firebase';

export class Autenticacao{
    public cadastrarUsuario(usuario: Usuario){
        console.log('Chegamos até o seriviço', usuario);
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                console.log(resposta);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }
}