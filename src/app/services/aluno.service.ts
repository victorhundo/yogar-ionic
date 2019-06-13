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

  putAlunos(uuid, obj): Observable<any> {
    return this.http.put(`${API}/alunos/${uuid}`, obj);
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

  getLicoes(): Observable<any> {
	  return this.http.get(`${API}/licoes`);
  }

  adicionaxp(xp): Observable<any> {
    var uuid = this.getUuid();
    console.log(`${API}/alunos/${uuid}/xp`)
    return this.http.post(`${API}/alunos/${uuid}/xp`, xp);
  }



  public getToken(): any {
    var login = JSON.parse(localStorage.getItem("login"));
    if (login == null)
      return login;
    else
      return login.token;
  }

  getUuid(): any {
    var login = JSON.parse(localStorage.getItem("login"));
    if (login == null)
      return login;
    else
      return login.user.uuid;
  }

  public getLogin(): any {
    return JSON.parse(localStorage.getItem("login"));
  }

  public setLogin(newLogin): any {
    localStorage.setItem('login',JSON.stringify(newLogin));
  }

  public getLicoesStorage(): any {
    var licoes = JSON.parse(localStorage.getItem("licoes"));
    if (licoes == null)
      return licoes;
    else
      return licoes;
  }

  public submit(post: FormData): Observable<any> {
    return this.http.post<any>(`${API}/desafio`, post);
  }


}
