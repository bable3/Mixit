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
import { FiltersComponent } from './container/reporting/filters/filters.component'

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FilterCardComponent } from './container/reporting/filters/card/filter-card.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    'swipe': { direction: Hammer.DIRECTION_ALL }
  }
}

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
    StepByStepComponent,
    FiltersComponent,
    FilterCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RecipeService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  //module de Boot
  bootstrap: [AppComponent]
})
export class AppModule { }
