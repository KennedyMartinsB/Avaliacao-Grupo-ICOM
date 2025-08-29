import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { novoJogo } from 'src/app/interface/jogo';
import { JogoService } from 'src/app/service/jogo.service';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.scss']
})
export class CadastroFormComponent implements OnInit{
  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private jogoService: JogoService) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      ano: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
      produtora: ['', Validators.required],
      idadeMinima: ['', Validators.required],
      descricao: ['', Validators.required],
    })
  }

  onSubmit(): void{
    if(this.cadastroForm.valid){
      const novoJogo : novoJogo = this.cadastroForm.value;
      console.log("Dados do cadastro: ", novoJogo)
    }
  }
}
