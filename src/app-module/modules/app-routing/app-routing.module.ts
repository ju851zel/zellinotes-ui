import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeOverviewComponent} from '../recipes/recipe-overview/recipe-overview-component/recipe-overview.component';
import {HomeComponent} from '../home/home-component/home.component';
import {SingleRecipeComponent} from '../recipes/single-recipe/single-recipe-component/single-recipe.component';


const routes: Routes = [
  { path: ':recipes/:recipeId', component: SingleRecipeComponent },
  { path: ':recipes', component: RecipeOverviewComponent },
  { path: ':home', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
