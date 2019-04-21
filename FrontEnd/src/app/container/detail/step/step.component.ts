import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss']
})
export class StepComponent {
    @Input() step: any[];
};