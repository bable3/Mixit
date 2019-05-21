import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model'
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService extends BaseService {
    private endPoint = {
        recipes: `${environment.apiUrl}recipes`,
        recipe: `${environment.apiUrl}recipe`,
        search: `${environment.apiUrl}search`,
        ingredients: `${environment.apiUrl}ingredients`
    };

    constructor(protected http: HttpClient) {
        super(http);
    }

    getAll(search: string = null): Observable<Recipe[]> { 
        const params = new HttpParams()
            .set('search', search);
        return this._get(this.endPoint.recipes, params);
    }
    getIngredients(): Observable<Ingredient[]> {
        return this._get(this.endPoint.ingredients);
    }

    findById(recipeId: number): Observable<Recipe> {
        return this._get(`${this.endPoint.recipe}/${recipeId}`);
    }
    search(difficulty: string, taste: string, ingredients: string): Observable<Recipe[]>{
        const params = new HttpParams()
            .set('taste', taste)
            .set('ingredients', ingredients)
            .set('difficulty', difficulty);
        return this._get(this.endPoint.search, { params });
    }
}
