import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app-component/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RecipeModule} from './modules/recipe-module/recipe.module';
import {AppRoutingModule} from './modules/app-routing-module/app-routing.module';
import {NavbarComponent} from './navbar-component/navbar.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RecipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
