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

  constructor(private alunoService: AlunoService) {}

  ngOnInit() {
    this.getLicoes();
    this.API_URL_IMG = API;
  }


  getLicoes() {
    this.results = this.alunoService.getLicoes();
    this.results.subscribe(res => {
      this.licoes = res;
      localStorage.setItem('licoes',JSON.stringify(res));
    });
  }

}
