import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Jogo, novoJogo } from 'src/app/interface/jogo';
import { JogoService } from 'src/app/service/jogo.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit{

  editarForm!: FormGroup;
  jogoId: any | null = null;

 constructor(
    private formBuilder: FormBuilder,
    private jogoService: JogoService,
    private route: ActivatedRoute, // Use ActivatedRoute para acessar os parâmetros da rota atual
    private router: Router
  ) {}

  ngOnInit() {
    this.editarForm = this.formBuilder.group({
      id: [{ value: '', disabled: true}],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      ano: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
      produtora: ['', Validators.required],
      idadeMinima: ['', Validators.required],
      descricao: ['', Validators.required],
    });

      this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.jogoId = idParam;
        this.jogoService.getGameById(this.jogoId).subscribe(jogo => {
          this.editarForm.patchValue({
            id: jogo.id,
            nome: jogo.nome,
            ano: jogo.ano,
            produtora: jogo.produtora,
            idadeMinima: jogo.idadeMinima,
            descricao: jogo.descricao
          });
        });
      }
    })
  }

    salvarEdicao(): void {
    if (this.editarForm.valid) {
      const jogoAtualizado: Jogo = {
        ...this.editarForm.value
      };

      console.log(jogoAtualizado)
      // Pega um parametro da url
      const id = this.route.snapshot.paramMap.get('id');
      this.jogoService.putGame(jogoAtualizado, id).subscribe({
        next: () => {
          console.log('Jogo atualizado com sucesso')
          this.router.navigate(['home'])
        },
        error: (error) => {
          console.error('Erro ao atualizar jogo:', error);
        }
      });
    }
  }



}
