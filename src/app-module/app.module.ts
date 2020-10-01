import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app-component/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RecipeModule} from './modules/recipes/recipe.module';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {NavbarComponent} from './navbar-component/navbar.component';
import {HomeModule} from './modules/home/home.module';
import {HttpClientModule} from '@angular/common/http';
import {RecipeService} from './services/recipe-service/recipe.service';

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
    HomeModule,
    HttpClientModule,
  ],
  providers: [
    // RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
