import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})


export class TabsPage implements OnInit {
  constructor(private router: Router) {}
  aluno = undefined;
  ngOnInit() {
    if(localStorage.getItem('login') == null) this.router.navigate(['logar']);
    else{
      var aluno = JSON.parse(localStorage.getItem('login'));
      if (aluno.type != 'aluno'){
        localStorage.clear();
        this.router.navigate(['logar']);
      }
    }
  }
}
