import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Event, NavigationEnd } from '@angular/router';
import { AlunoService } from './../../../services/aluno.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  results: any;
  user: any
  uuid: string;
  xp: number;

  fields: {
      field: string,
      value: string,
      icon: string,
      name: string,
      isDisable: boolean,
      atualiza: () => any,
      enableField: () => any,
    }[];

  constructor(private alunoService: AlunoService,
    private router: Router,
    public dialog: MatDialog) {
    router.events.subscribe((val:Event) => {
      if(val instanceof NavigationEnd ){
        if (val.url == "/t/tabs/tab3"){
          console.log(val)
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('login')).user
    this.fields = [
      {field: 'primeiroNome', value: user.primeiroNome, icon: 'lock', name: 'Primeiro Nome', isDisable: true, atualiza: this.atualizaPrimeiroNome, enableField: this.enablePrimeiroNome},
      {field: 'ultimoNome', value: user.ultimoNome, icon: 'lock', name: 'Ultimo Nome', isDisable: true, atualiza: this.atualizaUltimoNome, enableField: this.enableUltimoNome},
      {field: 'email', value: user.email, icon: 'lock', name: 'Email', isDisable: true, atualiza: this.atualizaEmail, enableField: this.enableEmail},
      {field: 'username', value: user.username, icon: 'lock', name: 'Username', isDisable: true, atualiza: this.atualizaUsername, enableField: this.enableUsername},
      {field: 'senha', value: user.senha, icon: 'lock', name: 'Senha', isDisable: true, atualiza: this.atualizaSenha, enableField: this.enableSenha},
    ]

    this.user = user;
    this.xp = (user.xp/100);
    if (this.xp == 0) this.xp = 1;
    this.uuid = user.uuid;
  }

  enableField(obj) {
    obj.isDisable = ! obj.isDisable;
    if (obj.isDisable){
      obj.icon = 'lock';
    }else{
      obj.icon = 'lock_open';
    }
  }

  atualizaField(obj){
    var atualiza = {campo: obj.field, valor: obj.value};
    this.atualizar(atualiza, obj.name);
  }

  atualizar(obj, campo){
    this.results = this.alunoService.putAlunos(this.uuid, obj);
    this.results.subscribe( res => {
      alert(campo + ' Atualizado com Sucesso!')
      this.router.navigate(['t'])
    })
  }

  ehPremium(){
    return this.user.ehPremium;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/logar'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '95%',
      data: 'asdsad'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-upgrade',
  templateUrl: 'dialog.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Dialog {
  results: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alunoService: AlunoService,) {}

  fazerUpgrade(){
    this.results = this.alunoService.upgrade();
    this.results.subscribe( res => {
      var login = this.alunoService.getLogin();
      login.user.ehPremium += true;
      this.alunoService.setLogin(login);
      console.log(res);
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
