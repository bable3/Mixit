import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    public isSearch: boolean = true;
    public isHome: boolean = true;
    public toggleSearch: boolean = false;
    public searchvalue: string;

    constructor(
        private router: Router) {
        this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((val: NavigationStart) => {
            this.isHome = (val.url === '/');
        });
    }

    redirect(route: string = null) {
        const param = (route !== null) ? '/' + route : '/';
        this.router.navigate([param]);
    }

    toggleSearchValue(way) {
        if (way == "hide") {
            this.toggleSearch = true;
            this.isSearch = false;
        } if (way == 'show') {
            this.toggleSearch = false;
            this.isSearch = true;
        } else {
            this.toggleSearch = !this.toggleSearch;
            this.isSearch = !this.isSearch;
        }

    }

}
