import { Component ,OnInit} from '@angular/core';
import { AlunoService } from '../../../../services/aluno.service';
import { Observable } from 'rxjs';
import { API } from 'src/app/API';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-licoes',
  templateUrl: './licoes.page.html',
  styleUrls: ['./licoes.page.scss'],
})
export class LicoesPage implements OnInit{
  constructor(private alunoService: AlunoService,
              private route: ActivatedRoute,
              private router: Router,
              private camera: Camera) {}

  results: Observable<any>;
  licoes: any;
  licao: any;
  API_URL_VIDEO: string;
  id: any;
  fotoDesafio:any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.licoes = this.alunoService.getLicoesStorage();
    this.licoes = this.licoes.filter((licao) => {
      return licao.id == this.id;
    });
    this.licao = this.licoes[0];
    this.API_URL_VIDEO = `${API}/professores/${this.licao.uuidProfessor}/licoes/${this.id}/video`
  }

  tirarFoto(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.fotoDesafio = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
