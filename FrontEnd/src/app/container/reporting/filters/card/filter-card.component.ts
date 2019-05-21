import { Component, Input, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
    selector: 'app-cardFilters',
    templateUrl: './filter-card.component.html',
    styleUrls: ['./filter-card.component.scss']
})
export class FilterCardComponent {
    @Input() ingredient: any;

    activeFilter() {
        this.ingredient.isActive = true;
    };
    desactiveFilter() {
        this.ingredient.isActive = false;
    };
}
