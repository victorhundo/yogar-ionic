import { Component, OnInit } from '@angular/core';
import { AlunoService } from './../../services/aluno.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {
   hide = true;
   results: Observable<any>;
   username: any;
   senha: any;

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit() {
  }
  logar(){
      var model2 =  {username:this.username,
       senha:this.senha}

      this.results = this.alunoService.logarAluno(model2);
      this.results.subscribe( res => {
        if(res.type == 'aluno'){
          localStorage.setItem('login',JSON.stringify(res));
          this.router.navigate([''])
        }
      })
    }

}
