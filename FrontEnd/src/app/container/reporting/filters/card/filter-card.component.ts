import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
    selector: 'app-cardFilters',
    templateUrl: './filter-card.component.html',
    styleUrls: ['./filter-card.component.scss']
})
export class FilterCardComponent {
    @Input() ingredient: Ingredient;
    selected: boolean = false;
}
