import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from 'src/app/API';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {
  url = "http://api.yogar.splab.ufcg.edu.br"
  constructor(private http:HttpClient) { }

  getAlunos(): Observable<any> {
    return this.http.get(`${API}/alunos`);
  }

  postAlunos(data): Observable<any> {
	  return this.http.post(`${API}/alunos`, data);
  }
  logarAluno(data2): Observable<any>{
    return this.http.post(`${API}/auth/login`, data2);
  }
  getPosts(): Observable<any> {
	  return this.http.get(`${API}/posts`);
  }

  public getToken(): any {
    var login = JSON.parse(localStorage.getItem("login"));
    if (login == null)
      return login;
    else
      return login.token;
  }

}
