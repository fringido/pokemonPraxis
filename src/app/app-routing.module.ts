import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import {PerfilComponent} from './pages/perfil/perfil.component';


const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path:'pokemon/:id',
    component: PokemonComponent
  },
  {
		path: '**',
		component: ErrorComponent,
	},
]
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})

export class AppRoutingModule {}
