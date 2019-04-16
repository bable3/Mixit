import { Step } from './step.model';

export class Recipe {
    id: number;
    name: string;
    taste: number;
    image: string;
    time: number;
    difficulty: number;
    step: number;
    glass: number;
    vol: number;
    canShake: boolean;
    steps: Step[];
}
