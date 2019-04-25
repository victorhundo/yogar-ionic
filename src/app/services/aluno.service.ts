import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  url = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  getAlunos(): Observable<any> {
    return this.http.get('http://localhost:3000/alunos');
  }

  postAlunos(data): Observable<any> {
	  return this.http.post('http://localhost:3000/alunos', data);
  }
}
