import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  url = "http://api.yogar.splab.ufcg.edu.br"
  constructor(private http:HttpClient) { }

  getAlunos(): Observable<any> {
    return this.http.get('http://api.yogar.splab.ufcg.edu.br/alunos');
  }

  postAlunos(data): Observable<any> {
	  return this.http.post('http://api.yogar.splab.ufcg.edu.br/alunos', data);
  }
  logarAluno(data2): Observable<any>{
    return this.http.post('http://api.yogar.splab.ufcg.edu.br/auth/login', data2);
  }
  getPosts(): Observable<any> {
	  return this.http.get('http://api.yogar.splab.ufcg.edu.br/posts');
  }
  public getToken(): any {
  return localStorage.getItem('token');
}

}
