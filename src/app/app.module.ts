import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeroeComponent } from "./pages/heroe/heroe.component";
import { HeroesComponent } from "./pages/heroes/heroes.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HeroeComponent, HeroesComponent],
  imports: [BrowserModule, FontAwesomeModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
