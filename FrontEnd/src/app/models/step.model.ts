import { Ingredient } from './ingredient.model';

export class Step {
    public id: number;
    public quantity: number;
    public order: number;
    public content: string;
    public ingredient: Ingredient;
}
