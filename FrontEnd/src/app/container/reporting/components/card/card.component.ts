import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { isNil } from 'lodash';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
    @Input() recipe: Recipe;
    public recipeValue: Recipe;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.recipeValue = this.recipe;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.recipe && !isNil(changes.recipe.currentValue)) {
            this.recipeValue = changes.recipe.currentValue;
        }
    }
    redirect(id: number) {
        this.router.navigate(['/detail/' + id]);
    }
}
