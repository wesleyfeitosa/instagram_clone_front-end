import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Autenticacao{
    public cadastrarUsuario(usuario: Usuario){
        console.log('Chegamos até o seriviço', usuario);
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                //remover o atributo senha do objeto usuario
                delete usuario.senha;

                //registrando dados complementares do usuário no path email na base 64 
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set({ usuario })
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }
}