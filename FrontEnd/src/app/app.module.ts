import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportingComponent } from './container/reporting/reporting.component';
import { AppRoutingModule } from './app-rounting.module';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './container/reporting/components/card/card.component';
import { DetailComponent } from './container/detail/detail.component';
import { NavComponent } from './container/navigation/nav.component';
import { SliderComponent } from './container/reporting/components/slider.component';
import { StepComponent } from './container/detail/step/step.component';
import { IngredientComponent } from './container/detail/ingredient/ingredient.component';
import { StepByStepComponent } from './container/detail/stepbystep/stepbystep.component';
//import de tous les modules

@NgModule({
  declarations: [
    AppComponent,
    ReportingComponent,
    CardComponent,
    DetailComponent,
    NavComponent,
    SliderComponent,
    StepComponent,
    IngredientComponent,
    StepByStepComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RecipeService
  ],
  //module de Boot
  bootstrap: [AppComponent]
})
export class AppModule { }
