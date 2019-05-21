import { Component, Input, SimpleChanges, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isNil } from 'lodash';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnChanges, OnDestroy {
    @Input() recipesInput: Recipe[];
    public recipes: Recipe[];
    private allRecipes: Recipe[];
    private search: string;
    private subscribeRecipe: Subscription = new Subscription();

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute)
    {
        this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((val:NavigationStart) => {
            this.search = val.url.substr(1);
            if (!isNil(this.search) && this.search !== '' && this.search !== 'filters' && !isNil(this.allRecipes)) {
                this.recipes = this.allRecipes.filter(r => r.name.toLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1);
            }
        });
    }

    ngOnInit(): void {
        this.search = this.route.snapshot.paramMap.get("search");
        this.recipes = this.recipesInput;

        if (isNil(this.recipes)) {
            this.subscribeRecipe = this.recipeService.getAll(this.search).subscribe(result => {
                this.allRecipes = result;
                this.recipes = (!!this.search) ? result.filter(r => r.name.toLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1) : result;
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.event && (!!changes.event.currentValue)) {
            this.recipes = changes.event.currentValue;
        }
    }

    ngOnDestroy(): void {
        if (this.subscribeRecipe) {
            this.subscribeRecipe.unsubscribe();
        }
    }
}