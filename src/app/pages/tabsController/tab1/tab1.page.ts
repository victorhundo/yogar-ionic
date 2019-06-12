import { Component ,OnInit} from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { Observable } from 'rxjs';
import { API } from 'src/app/API';
import { Router, ActivatedRoute, ParamMap, Event, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  results: Observable<any>;
  posts: any;
  API_URL_IMG: string;

  constructor(private alunoService: AlunoService, private router: Router) {
    router.events.subscribe((val:Event) => {
      if(val instanceof NavigationEnd ){
        if (val.url == "/t/tabs/tab1"){
          console.log(val)
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.vai();
    this.API_URL_IMG = API;
  }


  vai() {
    this.results = this.alunoService.getPosts();
    this.results.subscribe(res => {
    this.posts = res;
  });
  }

}
