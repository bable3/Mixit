import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Output() submitted: EventEmitter<any> = new EventEmitter();
    @Output() searchValue: EventEmitter<any> = new EventEmitter();
    @ViewChild('search') nameField: ElementRef;

    @Input('savedSearchValue') savedValue;

    public form: FormGroup;
    public value: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.form = this.formBuilder.group({
            search: ['']
        });
    }

    saveValue() {
        this.value = this.form.get('search').value;
        this.searchValue.emit(this.value);
    }

    ngOnInit(): void {
        this.nameField.nativeElement.focus();

    }

    redirect(route: string) {
        this.router.navigate(['/' + route]);
    }

    submit() {
        if (!this.form.valid) {
            return;
        }
        this.desactiveSearch();
        this.router.navigate(['/' + this.form.get('search').value]);
    }

    resetForm() {
        this.form.reset();
    }


    desactiveSearch() {
        this.submitted.emit('');
    }
}
