import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipeService extends BaseService {
    private endPoint = {
        recipes: `${environment.apiUrl}recipes`,
        recipe: `${environment.apiUrl}recipe`
    };

    constructor(protected http: HttpClient) {
        super(http);
    }

    getAll(): Observable<Recipe[]> {
        return this._get(`${this.endPoint.recipes}`);
    }

    findById(recipeId: number): Observable<Recipe> {
        return this._get(`${this.endPoint.recipe}/${recipeId}`);
    }
}
