import { Component ,OnInit, Inject, ViewChild, AfterViewChecked, ElementRef} from '@angular/core';
import { AlunoService } from '../../../../services/aluno.service';
import { ChatService } from '../../../../services/chat.service';
import { Observable } from 'rxjs';
import { API } from 'src/app/API';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-licoes',
  templateUrl: './licoes.page.html',
  styleUrls: ['./licoes.page.scss'],
})
export class LicoesPage implements OnInit{
  location: Location;

  constructor(private alunoService: AlunoService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              location: Location) {
                this.location = location;
              }

   @ViewChild('video') matVideo: any;


  results: Observable<any>;
  licoes: any;
  licao: any;
  API_URL_VIDEO: string;
  id: any;
  animal: string;
  name: string;
  video: HTMLVideoElement;
  user: any;



  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('login')).user
    this.id = this.route.snapshot.paramMap.get('id');
    this.licoes = this.alunoService.getLicoesStorage();
    this.licoes = this.licoes.filter((licao) => {
      return licao.id == this.id;
    });
    this.licao = this.licoes[0];
    this.API_URL_VIDEO = `${API}/professores/${this.licao.uuidProfessor}/licoes/${this.id}/video`

    this.video = this.matVideo.getVideoTag();
    this.video.addEventListener('ended', () => this.openDialogXp());
    console.log(this.licao.desafio)
  }

  ehPremium(){
    return this.user.ehPremium;
  }

  hasDesafio(){
    return this.licao.desafio != 'null' && this.licao.desafio != 'Sem desafio'
  }

  openDialogXp(): void {
    const dialogRef = this.dialog.open(DialogXp, {
      width: '95%',
      data: this.licao
    });

    this.results = this.alunoService.adicionaxp({valor: 100});
    this.results.subscribe( res => {
      var login = this.alunoService.getLogin();
      login.user.xp += 100;
      this.alunoService.setLogin(login);
      console.log(res);
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '95%',
      data: this.licao
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  openDialogChat(): void {
    const dialogRef = this.dialog.open(DialogChat, {
      width: '95%',
      data: this.licao
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  voltar(): void {
    this.location.go('/t')
  }
}



/**
 * @title Dialog Overview
 */
@Component({
  selector: './dialog-overview-example',
  templateUrl: './dialog.html',
  styleUrls: ['./licoes.page.scss'],
})
export class Dialog {

  constructor(
  public dialogRef: MatDialogRef<Dialog>,
  @Inject(MAT_DIALOG_DATA) public data: any,
          private camera: Camera,
        private alunoService: AlunoService,) {}

  fotoDesafioPost:any;
  results: Observable<any>;
  enviado:boolean = false;
  loading:boolean = false;
  erro:boolean = false;
  fotoTirada:boolean = false;
  desafio:any;
  fotoDesafioView:any;
  posicao_esperada:any = this.data.desafio;

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  consoleFlag(){
    console.log(this.loading, this.enviado);
  }

  enviadoSucesso(){
    this.loading = false;
    if (this.desafio.nome == this.posicao_esperada && this.desafio.pts > 0.89){
      this.enviado = true;
      this.results = this.alunoService.adicionaxp({valor: 100});
      this.results.subscribe( res => {
        var login = this.alunoService.getLogin();
        login.user.xp += 100;
        this.alunoService.setLogin(login);
        console.log(res);
      })
    }else{
      this.enviado = false;
      this.fotoTirada = false;
      this.erro = true;
    }
  }

  submit(){
    this.loading = true;
    var file = this.dataURLtoFile(this.fotoDesafioView, 'image.jpeg');
    const formData = new FormData();
    formData.append('theFile', file);
    this.alunoService.submit(formData).subscribe( result =>{
      this.desafio = result.message[0];
      this.enviadoSucesso();
    });
  }

  tirarFoto() {
    this.fotoTirada = true
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.fotoDesafioPost = imageData;
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.fotoDesafioView= base64image;

      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-xp',
  templateUrl: 'dialog-xp.html',
  styleUrls: ['./licoes.page.scss'],
})
export class DialogXp {

  constructor(
    public dialogRef: MatDialogRef<DialogXp>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-chat',
  templateUrl: 'dialog-chat.html',
  styleUrls: ['./licoes.page.scss'],
})
export class DialogChat implements OnInit{

  @ViewChild('scrollMe', {read: ElementRef}) myScrollContainer: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<DialogChat>,
    private chatService: ChatService,
    private alunoService: AlunoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.uuidAluno = JSON.parse(localStorage.getItem('login'))["user"]["uuid"];
      this.uuidProfessor = data.uuidProfessor;
      this.room = `${data.id}+${this.uuidProfessor}+${this.uuidAluno}`
      console.log(this.room);
      console.log(data)
      this.chatService.joinRoom(this.room)
      var results:Observable<any> = this.chatService.getMessageSave(this.room);
      results.subscribe( res => {
        this.msgs = res;
        this.chatService.getMessage(this.msgs)
        // this.scrollToBottom();
        setTimeout(() => {  this.scrollToBottom(); console.log('baixa')},10)
      })
      console.log(data)
    }

  ngOnInit() {

    }
  msgs:any[] = [];
  room:string;
  uuidAluno:string;
  uuidProfessor:string;
  alunoNome: string = JSON.parse(localStorage.getItem('login'))["user"]["primeiroNome"];

  msg:object = {
    licao: this.data,
    aluno: this.alunoService.getLogin().user
  }

  chatInput: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

  scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { console.log(err)}
    }

  sendButtonClick(el: HTMLElement) {
    //console.log(this.msg)
    var now: Date = new Date();
    var msg = {
      room: this.room,
      licao: this.data.id,
      professor: this.data.uuidProfessor,
      aluno: this.uuidAluno,
      date: now,
      msg: this.chatInput,
      remetente: 'aluno',
      alunoNome: this.alunoNome,
      licaoTitulo: this.data.titulo
    }
    this.chatService.sendMessage(msg);
    this.chatInput = "";
  }

  desabilita(){
    return false;
  }

}
