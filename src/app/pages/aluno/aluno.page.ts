import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunoPage implements OnInit {
  results: Observable<any>;
  primeiroNome: any;
  ultimoNome: any;
  email: any;
  username: any;
  senha: any;

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit() {
  }

  criaAluno(){
    var model = {
      "nome":{
        "primeiro":this.primeiroNome,
        "ultimo":this.ultimoNome
      },
      "endereco":{
        "rua":"",
        "cidade":"",
        "estado":"",
        "cep": 0
      },
      "email":this.email,
      "login":{
        "username":this.username,
        "senha": this.senha
      }
    }
    this.results = this.alunoService.postAlunos(model);
    this.results.subscribe( res => {
      console.log(res);
     if (res.insertId != null){
        this.router.navigate(['logar']);
      }
    })
  }

}
