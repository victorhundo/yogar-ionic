import { Component ,OnInit, Inject} from '@angular/core';
import { AlunoService } from '../../../../services/aluno.service';
import { Observable } from 'rxjs';
import { API } from 'src/app/API';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  constructor(private alunoService: AlunoService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {}

  results: Observable<any>;
  licoes: any;
  licao: any;
  API_URL_VIDEO: string;
  id: any;
  animal: string;
  name: string;




  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.licoes = this.alunoService.getLicoesStorage();
    this.licoes = this.licoes.filter((licao) => {
      return licao.id == this.id;
    });
    this.licao = this.licoes[0];
    this.API_URL_VIDEO = `${API}/professores/${this.licao.uuidProfessor}/licoes/${this.id}/video`
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
          private camera: Camera) {}

  fotoDesafio:any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  tirarFoto(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.fotoDesafio = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
