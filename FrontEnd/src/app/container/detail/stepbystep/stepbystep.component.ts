import { Component, Input } from '@angular/core';
import 'hammerjs';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { direction: Hammer.DIRECTION_ALL }
    }
}
@Component({
    selector: 'app-stepbystep',
    templateUrl: './stepbystep.component.html',
    styleUrls: ['./stepbystep.component.scss'],
})

export class StepByStepComponent {
    @Input() steps: any[];
    @Input() recipe: any;
    public count: number = 0;
    public numberOfSteps: number;
    public numbers: any[];

    content: string;
    clicked: boolean;
    oneStepLength: number;
    liquidYPos: number;
    liquidHeight: number;
    clHeight: number;

    ngOnInit(): void {
        if (!this.recipe.canShake) {
            this.liquidHeight = setLiquidHeight(this.recipe.glass).liquid;
            this.clHeight = setLiquidHeight(this.recipe.glass).cl;
        } else {
            this.liquidHeight = setLiquidHeight('shaker').liquid;
            this.clHeight = setLiquidHeight('shaker').cl;
        }

        if (this.steps[this.steps.length - 1].ingredient != null) {
            this.numberOfSteps = this.steps.length + 1;
            this.content = stepByStep(this.count, this.steps);
        } else {
            this.numberOfSteps = this.steps.length;
            this.content = stepByStep(this.count, this.steps);
        }
        this.oneStepLength = 100 / this.numberOfSteps;
        this.numbers = Array(this.numberOfSteps).fill(0).map((x, i) => i);
        this.liquidYPos = this.liquidHeight - this.steps[0].quantity * this.clHeight;
    }
    incrementCounter() {
        if (this.count < this.steps.length - 1) {
            this.count = this.count + 1;
            this.content = stepByStep(this.count, this.steps);
            if (this.steps[this.count].quantity && this.steps[this.count].ingredient.unit == 'cl.') {
                this.liquidYPos = this.liquidYPos - this.steps[this.count].quantity * this.clHeight;
            }
        } else {
            this.clicked = false;
            this.count = 0;
            this.content = stepByStep(this.count, this.steps);
            this.liquidYPos = this.liquidHeight - this.steps[0].quantity * this.clHeight;
        }

    };
    decrementCounter() {
        if (this.count > 0) {
            this.count = this.count - 1;
            this.content = stepByStep(this.count, this.steps);
            if (this.steps[this.count + 1].ingredient && this.steps[this.count].quantity && this.steps[this.count + 1].ingredient.unit == 'cl.') {
                this.liquidYPos = this.liquidYPos + this.steps[this.count + 1].quantity * this.clHeight;
            }
        } else {

        }

    };
    setArrowState(clicked) {
        if (clicked) {
            return '<polyline class="st0" points="2.5,4.5 22,4.5 41.5,4.5" />'
        } else {
            return 'class = "pas lollol"'

        }
    };
};

function stepByStep($count, $steps) {
    let step = $steps[$count];
    let content = step.content;
    return content;
};

function setLiquidHeight(glass) {
    let liquidHeight;
    let numberOfcl;
    let clHeight;
    switch (glass) {
        case 'verre ballon':
            liquidHeight = 229.1;
            numberOfcl = 25;
            break;
        case 'verre à cocktail':
            liquidHeight = 166.6;
            numberOfcl = 13;
            break;
        case 'verre long drink':
            liquidHeight = 420.4;
            numberOfcl = 20;
            break;
        case 'verre à mojito':
            liquidHeight = 435.1;
            numberOfcl = 30;
            break;
        case 'verre old fashioned':
            liquidHeight = 287.4;
            numberOfcl = 30;
            break;
        case 'shaker':
            liquidHeight = 541.4;
            numberOfcl = 45;
            break;
        default:
            liquidHeight = 0;
            numberOfcl = 0;
            break;
    }
    clHeight = liquidHeight / numberOfcl;
    return { 'liquid': liquidHeight, 'cl': clHeight };
}
