import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
    public recipes: Array<Recipe> = new Array<Recipe>();
    private subscribeRecipe: Subscription = new Subscription();

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.subscribeRecipe = this.recipeService.getAll().subscribe(result => {
            this.recipes = result;
            console.log(result);
        });
    }

    ngOnDestroy(): void {
        if (this.subscribeRecipe) {
            this.subscribeRecipe.unsubscribe();
        }
    }
}
