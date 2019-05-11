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
    glassImage: string;
    vol: number;
    canShake: boolean;
    steps: Step[];
}
