import { Component, Input } from '@angular/core';
import 'hammerjs';
import * as $ from 'jquery';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

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

    ngOnInit(): void {

        if (this.steps[this.steps.length - 1].ingredient != null) {
            this.numberOfSteps = this.steps.length + 1;
            this.content = stepByStep(this.count, this.steps);
        } else {
            this.numberOfSteps = this.steps.length;
            this.content = stepByStep(this.count, this.steps);
        }
        modifyLoadingBarWidth(this.count + 1, this.numberOfSteps);
        this.numbers = Array(this.numberOfSteps).fill(0).map((x, i) => i);
        $('#dot-0').addClass('dot-active');;
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
            $('.step-by-step').addClass('non-active');
            this.clicked = false;
            this.count = 0;
            this.content = stepByStep(this.count, this.steps);
        }
        modifyLoadingBarWidth(this.count + 1, this.numberOfSteps);
        activateDots(this.count);
    };
    decrementCounter() {
        if (this.count > 0) {
            this.count = this.count - 1;
            this.content = stepByStep(this.count, this.steps);
        } else {
            //si on veut que en decrement à moins que 1, le component parte.
            //     $('.step-by-step').addClass('non-active');
            //     this.clicked = false;
        }
        modifyLoadingBarWidth(this.count + 1, this.numberOfSteps);
        activateDots(this.count);
    };
};

function stepByStep($count, $steps) {
    let step = $steps[$count];
    let content = step.content;
    return content;
};
function modifyLoadingBarWidth(count, countLength) {
    let oneStepLength = 100 / countLength;
    $('.loading-bar').width(oneStepLength * count + "%");
};
function activateDots(count) {
    $(".dot").removeClass('dot-active');
    $('#dot-' + count).addClass('dot-active');
};
