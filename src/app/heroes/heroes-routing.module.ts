import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroesPageComponent } from './pages/comics-heroes-page/comics-heroes-page.component';

const routes: Routes =[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':id',
    component: HeroesPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule { }
