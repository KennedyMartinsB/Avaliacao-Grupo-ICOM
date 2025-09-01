import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroFormComponent } from './components/cadastro-form/cadastro-form.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastro',
    component: CadastroFormComponent
  },
  {
    path: 'home/editar/:id',
    component: EditFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
