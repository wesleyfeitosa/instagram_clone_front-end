import { CanActivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Autenticacao } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoGuard implements CanActivate{

    constructor(private autenticacao: Autenticacao){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.autenticacao.autenticado();
    }


}