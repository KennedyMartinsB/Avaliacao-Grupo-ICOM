import { Injectable } from '@angular/core';
import { Jogo } from '../interface/jogo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private API_URL = "http://localhost:3004/jogo"

  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<Jogo[]>{
    return this.httpClient.get<Jogo[]>(this.API_URL);
  }

  deleteGame(id: Number): Observable<void>{
    const del_Url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<void>(del_Url);
  }
}
