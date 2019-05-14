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
    @Input() recipe: any[];
    public count: number = 0;
    public numberOfSteps: number;
    content: string;
    clicked: boolean;
    public numbers: any[];
    oneStepLength: number;
    public variable: string = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 650"><path d="M349.6 415.2c11.1-14 25.2-24.8 40.8-31.1 25.6-10.4 88.1-42.3 115.2-113.7 23.9-62.8 14.1-139.1-29.2-226.9-1.8-3.7-6.3-5.2-10-3.4-3.7 1.8-5.2 6.3-3.4 10 18.4 37.3 30.5 72.4 36.3 105H213.4c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5h288.2c4.2 34.7.9 66.5-9.9 95-25.1 65.9-83.1 95.4-106.9 105.1-18 7.3-34.3 19.7-46.9 35.8l-13.6 17.3-13.6-17.3c-12.7-16.1-28.9-28.4-46.9-35.8C240 360.5 182 331 156.9 265.1c-22.3-58.7-12.7-131 28.6-215 1.8-3.7.3-8.2-3.4-10-3.7-1.8-8.2-.3-10 3.4-43.3 87.8-53.1 164.2-29.2 226.9 27 71.4 89.5 103.2 115.1 113.6 15.6 6.4 29.7 17.1 40.8 31.1l17.9 22.7v105.7c-29.2 55.3-124 74.9-124.9 75.1-3.8.8-6.4 4.3-6 8.1s3.6 6.8 7.5 6.8h261.9c3.9 0 7.1-3 7.5-6.8s-2.3-7.4-6.1-8c-.3 0-27.2-5-56.4-17.2-25.8-10.8-58.5-29.4-68.4-57.3V437.9l17.8-22.7zm52.6 203.3H242.6c2.6-1 5.1-2.1 7.8-3.2 33.6-14.6 58-32.7 72.9-53.8 16.2 27.7 49.8 45.9 78.9 57z" fill="#fff"/></svg>';

    ngOnInit(): void {

        if (this.steps[this.steps.length - 1].ingredient != null) {
            this.numberOfSteps = this.steps.length + 1;
            this.content = stepByStep(this.count, this.steps);
        } else {
            this.numberOfSteps = this.steps.length;
            this.content = stepByStep(this.count, this.steps);
        }
        this.oneStepLength = 100 / this.numberOfSteps;
        this.numbers = Array(this.numberOfSteps).fill(0).map((x, i) => i);
    }
    incrementCounter() {
        if (this.count < this.steps.length - 1) {
            this.count = this.count + 1;
            this.content = stepByStep(this.count, this.steps);
        } else {
            this.clicked = false;
            this.count = 0;
            this.content = stepByStep(this.count, this.steps);
        }
    };
    decrementCounter() {
        if (this.count > 0) {
            this.count = this.count - 1;
            this.content = stepByStep(this.count, this.steps);
        } else {
            //si on veut que en decrement à moins que 1, le component parte c'est done en html.
            //     $('.step-by-step').addClass('non-active');
            //     this.clicked = false;
        }
    };
};

function stepByStep($count, $steps) {
    let step = $steps[$count];
    let content = step.content;
    return content;
};
