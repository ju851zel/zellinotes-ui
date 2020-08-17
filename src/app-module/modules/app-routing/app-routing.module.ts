import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeOverviewComponent} from '../recipes/recipe-overview-component/recipe-overview.component';
import {HomeComponent} from '../home/home-component/home.component';


const routes: Routes = [
  { path: 'recipes', component: RecipeOverviewComponent },
  { path: 'home', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
