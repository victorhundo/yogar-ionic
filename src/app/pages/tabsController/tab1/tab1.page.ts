import { Component ,OnInit} from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  results: Observable<any>;
  posts: any;
  constructor(private alunoService: AlunoService) {}
  
  ngOnInit() {this.vai();
  }


  vai() {
    this.results = this.alunoService.getPosts();
    this.results.subscribe(res => {
    this.posts = res;
  });
  }

}

