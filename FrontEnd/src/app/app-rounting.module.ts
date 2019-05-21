import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportingComponent } from './container/reporting/reporting.component';
import { DetailComponent } from './container/detail/detail.component';
import { FiltersComponent } from './container/reporting/filters/filters.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', component: ReportingComponent },
    { path: 'filters', component: FiltersComponent },
    { path: ':search', component: ReportingComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
