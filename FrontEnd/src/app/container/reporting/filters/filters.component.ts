import { Component, Output, EventEmitter } from '@angular/core';
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
    @Output() filtersChange = new EventEmitter();

    public ingredients: Array<Ingredient> = new Array<Ingredient>();
    private subscribeIngredient: Subscription = new Subscription();
    public types: Array<string> = [];
    public selectedFilters: string;
    public selectionSectionActive: boolean = false;

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void {

        this.subscribeIngredient = this.recipeService.getIngredients().subscribe(result => {
            this.ingredients = result;
            result.forEach(ingredient => {
                if (this.types.indexOf(ingredient['type']) == -1) {
                    this.types.push(ingredient['type']);
                }
            });
        });
        console.log(this.selectedFilters);
    }
    validateFilter() {
        this.ingredients.forEach(ingredient => {
            if (ingredient['isActive'] && !this.selectedFilters) {
                this.selectedFilters = `${ingredient['id']}`
            } else if (ingredient['isActive']) {
                this.selectedFilters = `${this.selectedFilters}%${ingredient['id']}`
            }
            ingredient['isActive'] = false;
        });
        this.filtersChange.emit(this.selectedFilters);
        this.selectedFilters = "";
    };

    ngOnDestroy(): void {
        if (this.subscribeIngredient) {
            this.subscribeIngredient.unsubscribe();
        }
    }
    resetFilters(): void {
        this.ingredients.forEach(ingredient => {
            ingredient['isActive'] = false;
        });
    }

}
