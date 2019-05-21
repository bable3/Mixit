import { Component } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent {
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
    reloadRecipes() {
        this.subscribeRecipe = this.recipeService.getAll().subscribe(result => {
            this.recipes = result;
        });
    }
    changeFilters($data: string): void {
        this.subscribeRecipe = this.recipeService.search('null', 'null', $data).subscribe(result => {
            //afin d'utiliser le ngfor on est obligé de recvoir un array d'objet voilà pourquoi on map
            this.recipes = Object.keys(result).map(key => {
                return result[key];
            });
        });
    };

}
