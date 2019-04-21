import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stepbystep',
    templateUrl: './stepbystep.component.html',
    styleUrls: ['./stepbystep.component.scss']
})

export class StepByStepComponent {
    @Input() steps: any[];
    public count: number = 0;
    public clicked: boolean;
    content: string;

    ngOnInit(): void {
        this.content = stepByStep(this.count, this.steps);
    }
    incrementCounter() {
        if (this.count < this.steps.length - 1) {
            this.count = this.count + 1;
            this.content = stepByStep(this.count, this.steps);
        } else {

        }
    };
    decrementCounter() {
        if (this.count > 0) {
            this.count = this.count - 1;
            this.content = stepByStep(this.count, this.steps);
        }
    };
};

function stepByStep($count, $steps) {
    let step = $steps[$count];
    let content = step.content;
    return content;
};

