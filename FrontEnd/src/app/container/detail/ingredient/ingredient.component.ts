import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ingredient',
    templateUrl: './ingredient.component.html',
    styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent {
    @Input() step: any[];
};