import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JogoService } from 'src/app/service/jogo.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {

  @Input() id: number | undefined;
  @Input() nome: string | undefined;
  @Input() descricao: string | undefined;
  @Input() produtora: string | undefined;
  @Input() ano: number | undefined;
  @Input() idadeMinima: number | undefined;

  private deleteSubscribe: Subscription | undefined;

  constructor(private jogoService: JogoService, private httpClient: HttpClient) {}

  deleteGame(id: any): void{
    this.deleteSubscribe = this.jogoService.deleteGame(id).subscribe({
      next: () => {
        console.log("Jogo excluido com sucesso!!!");
        window.location.reload()
      },
      error: (error: Error) => {
        console.log("Erro ao excluir empresa: ", error)
      },
      complete: () => {
        console.log("Operação de exclusão foi feita com sucesso!!!");
      }
    })
  }

}
