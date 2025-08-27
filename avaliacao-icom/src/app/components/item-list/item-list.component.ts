import { Component, Input } from '@angular/core';

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

}
