import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage {
   title = 'Cadastro do Usuário';
   usuarios= [];
   aux=[];
   name = "";
   age="";
   email="";
   passwordaux= "";
   password = "";

   add(){
    this.aux.push(this.name);
    this.aux.push(this.email);
    this.aux.push(this.age);
    this.aux.push(this.password);
    this.usuarios.push(this.aux)

  }

}
