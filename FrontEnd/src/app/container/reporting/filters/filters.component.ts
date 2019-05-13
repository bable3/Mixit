import { Component } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
    public ingredients: Array<Ingredient> = new Array<Ingredient>();
    private subscribeIngredient: Subscription = new Subscription();
    public types: Array<string> = [];

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {
        this.subscribeIngredient = this.recipeService.getIngredients().subscribe(result => {
            this.ingredients = result;
            console.log(result);
            result.forEach(ingredient => {
                if (this.types.indexOf(ingredient['type']) == -1) {
                    this.types.push(ingredient['type']);
                }

            });
        });
    }

    ngOnDestroy(): void {
        if (this.subscribeIngredient) {
            this.subscribeIngredient.unsubscribe();
        }
    }
}
