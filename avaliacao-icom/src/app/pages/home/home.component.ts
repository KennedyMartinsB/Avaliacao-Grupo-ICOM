import { Component, OnInit } from '@angular/core';
import { JogoService } from '../../service/jogo.service';
import { Jogo } from 'src/app/interface/jogo';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  jogos: Jogo[] = [];
  errorMessage: string | null = null;
  // assistir depois: https://www.youtube.com/watch?v=893uGY5E0XM

  constructor(private jogoService: JogoService) {}

  ngOnInit(){
    this.listarJogos();
  }

  listarJogos() {
    this.jogoService.getGames().subscribe({
      next: (data) => {
        this.jogos = data;
        console.log('Dados da API recebidos com sucesso:', this.jogos);
      },
      error: (error: Error) => {
        this.errorMessage = error.message; // Atribui a mensagem de erro
        console.error('Erro ao carregar empresas:', error);
      },
      complete: () => {
        console.log('Operação de carregamento de empresas concluída (Observable completo).');
      }
    });
  }

}
