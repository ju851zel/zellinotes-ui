import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app-component/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RecipeModule} from './modules/recipes/recipe.module';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {NavbarComponent} from './navbar-component/navbar.component';
import {HomeModule} from './modules/home/home.module';
import {ActivatedRouteSnapshot} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RecipeModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
