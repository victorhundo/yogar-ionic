import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { Observable } from 'rxjs';

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

  constructor(private alunoService: AlunoService) { }

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
    })
  }

}
