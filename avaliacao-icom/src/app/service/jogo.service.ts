import { Injectable } from '@angular/core';
import { Jogo, novoJogo } from '../interface/jogo';
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

  postGame(novoJogo: novoJogo): Observable<{ success: boolean } | string> {
    return this.httpClient.post<Jogo>(this.API_URL, novoJogo).pipe(
      // Mapeia a resposta de sucesso
      map(() => {
        // Retorna um objeto JSON com sucesso: true
        return { success: true };
      }),
      catchError((error: HttpErrorResponse) => {
        let messageError = 'Erro desconhecido ao realizar a requisição.';
        if (error.error instanceof ErrorEvent) {
          messageError = `Erro: ${error.error.message}`;
        } else {
          messageError = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        return throwError(() => messageError);
      })
    );
  }

  // putGame(jogoAtualizado: novoJogo): Observable<{sucess: Boolean} | string> {
  //   return this.httpClient.put<Jogo>(this.API_URL, {
  //     nome: jogoAtualizado.nome, ano: jogoAtualizado.ano,
  //     produtora: jogoAtualizado.produtora, idadeMinima: jogoAtualizado.idadeMinima,
  //     descricao: jogoAtualizado.descricao
  //   }).pipe(
  //     map(() => {
  //       return { sucess: true }
  //     }),
  //     catchError((error: HttpErrorResponse)=>{
  //       let messageError = 'Erro ao realizar a requisição de update.';
  //       if (error.error instanceof ErrorEvent) {
  //         messageError = `Erro: ${error.error.message}`;
  //       } else {
  //         messageError = `Erro no servidor: ${error.status} - ${error.message}`;
  //       }
  //       return throwError(() => messageError);
  //     })
  //   )
  // }

  // putGame(jogoAtualizado: novoJogo, id: any): Observable<novoJogo>{
  //   const URL = `${this.API_URL}/${id}`
  //   return this.httpClient.put<novoJogo>(URL, {
  //     nome: jogoAtualizado.nome,
  //     ano: jogoAtualizado.ano,
  //     produtora: jogoAtualizado,
  //     idadeMinima: jogoAtualizado.idadeMinima,
  //     descricao: jogoAtualizado.descricao
  //   })
  // }

   putGame(jogoAtualizado: novoJogo, id: any): Observable<{ sucesso: boolean }> {
    const URL = `${this.API_URL}/${id}`;

    // AQUI: Envie o objeto `jogoAtualizado` completo
    return this.httpClient.put<novoJogo>(URL, jogoAtualizado).pipe(
      // Mapeia a resposta de sucesso para o JSON desejado
      map(() => {
        return { sucesso: true };
      })
    );
  }

  getGameById(id: any): Observable<Jogo>{
    const url = `${this.API_URL}/${id}`
    return this.httpClient.get<Jogo>(url);
  }

}
