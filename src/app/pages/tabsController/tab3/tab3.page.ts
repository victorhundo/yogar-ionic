import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  ngOnInit() { }

  constructor(private router: Router) { }


  primeiroNome = JSON.parse(localStorage.getItem('login')).user.primeiroNome;

  logout() {
    localStorage.clear();
    this.router.navigate(['/logar'])
  }
}
