import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stepbystep',
    templateUrl: './stepbystep.component.html',
    styleUrls: ['./stepbystep.component.scss']
})

export class StepByStepComponent {
    @Input() steps: any[];
    @Input() recipe: any[];
    public count: number = 0;
    numberOfSteps: number;
    content: string;

    ngOnInit(): void {
        if (this.steps[this.steps.length - 1].ingredient != null) {
            this.numberOfSteps = this.steps.length + 1;
        } else {
            this.numberOfSteps = this.steps.length;
            this.content = stepByStep(this.count, this.steps);
        }
    }
    incrementCounter() {
        if (this.count < this.steps.length - 1) {
            this.count = this.count + 1;
            this.content = stepByStep(this.count, this.steps);
        } else if (this.steps[this.steps.length - 1].ingredient != null && this.count < this.steps.length) {
            // message de fin par défaut si il n'y en a pas de défini dans la db
            this.count = this.count + 1;
            this.content = 'dégustez !';
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

