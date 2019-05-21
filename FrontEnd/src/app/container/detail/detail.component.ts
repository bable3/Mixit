import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import 'hammerjs';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    public recipe: Recipe;
    private subscribeRecipe: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) { }

    ngOnInit(): void {
        const recipeId = this.route.snapshot.params.id;
        this.subscribeRecipe = this.recipeService.findById(recipeId).subscribe(result => {
            this.recipe = result;
        });
    }

    ngOnDestroy(): void {
        if (this.subscribeRecipe) {
            this.subscribeRecipe.unsubscribe();
        }
    }
    setMyStyles() {
        let styles = {
            'background': `url(./assets/images/cocktails/${this.recipe.image})`,
            'background-size': 'cover',
            'background-position': 'center'
        };
        return styles;
    }
}
