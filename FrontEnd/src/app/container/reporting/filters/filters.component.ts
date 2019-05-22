import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

    public recipes: Recipe[];
    public ingredients: Array<Ingredient> = new Array<Ingredient>();
    public types: Array<string> = [];
    public selectedFilters: string;

    private subscribeIngredient: Subscription = new Subscription();
    private subscribeRecipe: Subscription = new Subscription();

    constructor(
        private recipeService: RecipeService,
        private router: Router
    ) {
        this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((val: NavigationStart) => {
            this.recipes = null;
        });
    }

    ngOnInit(): void {

        this.subscribeIngredient = this.recipeService.getIngredients().subscribe(result => {
            this.ingredients = result;
            result.forEach(ingredient => {
                if (this.types.indexOf(ingredient.type) == -1) {
                    this.types.push(ingredient.type);
                }
            });
        });
    }

    validateFilter() {
        const ids = this.ingredients.filter(i => i.isActive).map(i => i.id);
        this.selectedFilters = ids.join('%');
        this.subscribeRecipe = this.recipeService.search('null', 'null', this.selectedFilters).subscribe(result => {
            this.recipes = result;
        });
        this.resetFilters();
    };

    ngOnDestroy(): void {
        if (this.subscribeIngredient) {
            this.subscribeIngredient.unsubscribe();
        }
        if (this.subscribeRecipe) {
            this.subscribeRecipe.unsubscribe();
        }
    }

    resetFilters(): void {
        this.ingredients.forEach(i => i.isActive = false);
    }
}
