import { Component ,OnInit} from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { Observable } from 'rxjs';
import { API } from 'src/app/API';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page implements OnInit{
  results: Observable<any>;
  licoes: any;
  API_URL_IMG: string;
  aluno: any;

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.aluno = JSON.parse(localStorage.getItem('login')).user;
    this.getLicoes();
    this.API_URL_IMG = API;
  }

  checkXp(licao:any) {
    var isDisable = true;
    if (this.aluno.xp == null && licao.nivel == 1){
      isDisable = false;
    }
    else if (this.aluno.xp >= (licao.nivel * 100)){
      isDisable = false;
    }
    return isDisable;
  }

  getLicoes() {
    this.results = this.alunoService.getLicoes();
    this.results.subscribe(res => {
      this.licoes = res;
      localStorage.setItem('licoes',JSON.stringify(res));
    });
  }

}
