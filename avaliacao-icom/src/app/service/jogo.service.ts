import { Injectable } from '@angular/core';
import { Jogo } from '../interface/jogo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  postJogo(jogo: Jogo): Observable<{ sucesso: boolean } | string> {
    return this.httpClient.post<Jogo>(this.API_URL, jogo).pipe(
      // Mapeia a resposta de sucesso
      map(() => {
        // Retorna um objeto JSON com sucesso: true
        return { sucesso: true };
      }),
      // Captura o erro
      catchError((error: HttpErrorResponse) => {
        let mensagemDeErro = 'Erro desconhecido ao realizar a requisição.';

        if (error.error instanceof ErrorEvent) {
          // Erro no lado do cliente ou na rede
          mensagemDeErro = `Erro: ${error.error.message}`;
        } else {
          // Erro no lado do servidor
          mensagemDeErro = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        // Retorna um Observable com uma string de erro
        return throwError(() => mensagemDeErro);
      })
    );
  }
}
