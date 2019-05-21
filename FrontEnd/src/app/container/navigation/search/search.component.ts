import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) { 
        this.form = this.formBuilder.group({
            search : ['']
        });
    }

    redirect(route: string) {
        this.router.navigate(['/' + route]);
    }

    submit() {
        if (!this.form.valid) {
            return;
        }
        this.router.navigate(['/' + this.form.get('search').value]);
    }

    resetForm() {
        this.form.reset();
    }
}
