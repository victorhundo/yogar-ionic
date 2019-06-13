import { Component ,OnInit, Inject, ViewChild} from '@angular/core';
import { AlunoService } from '../../../../services/aluno.service';
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




  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.licoes = this.alunoService.getLicoesStorage();
    this.licoes = this.licoes.filter((licao) => {
      return licao.id == this.id;
    });
    this.licao = this.licoes[0];
    this.API_URL_VIDEO = `${API}/professores/${this.licao.uuidProfessor}/licoes/${this.id}/video`

    this.video = this.matVideo.getVideoTag();
    this.video.addEventListener('ended', () => this.openDialogXp());
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
      data: {name: this.name, animal: this.animal}
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
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
    var posicao_esperada = "urdhva hastasana"
    if (this.desafio.nome == posicao_esperada && this.desafio.pts > 0.89){
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
