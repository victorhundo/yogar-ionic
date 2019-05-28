import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from './../../../services/aluno.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  results: Observable<any>;
  primeiroNome: string;
  PrimeiroNomeDisabled: object;
  ultimoNome: string;
  ultimoNomeDisabled: object;
  email: string;
  emailDisabled: object;
  username: string;
  usernameDisabled: object;
  senha: string;
  senhaDisabled: object;
  uuid: string;

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('login')).user
    this.uuid = user.uuid;
    this.primeiroNome = user.primeiroNome;
    this.primeiroNomeDisabled = {isDisable: true, icon: 'lock_close'};
    this.ultimoNome = user.ultimoNome;
    this.ultimoNomeDisabled = {isDisable: true, icon: 'lock_close'};
    this.email = user.email;
    this.emailDisabled = {isDisable: true, icon: 'lock_close'};
    this.username = user.username;
    this.usernameDisabled = {isDisable: true, icon: 'lock_close'};
    this.senha = user.senha;
    this.senhaDisabled = {isDisable: true, icon: 'lock_close'};
  }

  constructor(private alunoService: AlunoService, private router: Router) { }

  tiles: { text: string, cols: number, rows: number, color: string }[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 6, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  ];

  primeiroNome = JSON.parse(localStorage.getItem('login')).user.primeiroNome;

  logout() {
    localStorage.clear();
    this.router.navigate(['/logar'])
  }

  atualizar(obj, campo){
    this.results = this.alunoService.putAlunos(this.uuid, obj);
    this.results.subscribe( res => {
      alert(campo + ' Atualizado com Sucesso!')
      this.router.navigate(['t'])
    })
  }

  enable(obj){
    obj.isDisable = !obj.isDisable
    if (obj.isDisable){
      obj.icon = 'lock_close';
    }else{
      obj.icon = 'lock_open';
    }
  }

  atualizaPrimeiroNome() {
    this.enablePrimeiroNome();
    var atualiza = {campo: 'primeiroNome', valor: this.primeiroNome};
    this.atualizar(atualiza, 'Primeiro Nome');
  }

  enablePrimeiroNome(){
    this.enable(this.primeiroNomeDisabled);
  }

  atualizaUltimoNome() {
    this.enableUltimoNome();
    var atualiza = {campo: 'ultimoNome', valor: this.ultimoNome};
    this.atualizar(atualiza, 'Último Nome');
  }

  enableUltimoNome(){
    this.enable(this.ultimoNomeDisabled);
  }

  atualizaEmail() {
    this.enableEmail()
    var atualiza = {campo: 'email', valor: this.email};
    this.atualizar(atualiza, 'Email');
  }

  enableEmail(){
    this.enable(this.emailDisabled);
  }

  atualizaUsername() {
    this.enableUsername();
    var atualiza = {campo: 'username', valor: this.username};
    this.atualizar(atualiza, 'Username');
  }

  enableUsername(){
    this.enable(this.usernameDisabled);
  }

  atualizaSenha() {
    this.enableSenha();
    var atualiza = {campo: 'senha', valor: this.senha};
    this.atualizar(atualiza, 'Senha');
  }

  enableSenha(){
    this.enable(this.senhaDisabled);
  }

}
