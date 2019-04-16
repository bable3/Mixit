import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stepbystep',
    templateUrl: './stepbystep.component.html',
    styleUrls: ['./stepbystep.component.scss']
})
export class StepByStepComponent {
    @Input() step: any[];
};