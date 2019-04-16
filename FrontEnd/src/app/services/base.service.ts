import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class BaseService {

    constructor(
        protected http: HttpClient
    ) {}

    protected _get(url: string, options?: any) {
        return Observable.create((observer: Observer<any>) => {
            this.http.get(url, options).subscribe((response) => {
              observer.next(response);
            },
            (error: any) => {
                observer.error(error);
            });
        });
    }

    protected _put(url: string, data: any) {
        return Observable.create((observer: Observer<any>) => {
            this.http.put(url, data).subscribe((response) => {
                observer.next(response);
            },
            (error: any) => {
                observer.error(error);
            });
        });
    }

    protected _post(url: string, data: any, specificLoader) {
        return Observable.create((observer: Observer<any>) => {
            this.http.post(url, data).subscribe((response) => {
                observer.next(response);
            },
            (error: any) => {
                observer.error(error);
            });
        });
    }

    protected _delete(url: string) {
        return Observable.create((observer: Observer<any>) => {
            this.http.delete(url).subscribe((response) => {
                observer.next(response);
            },
            (error: any) => {
                observer.error(error);
            });
        });
    }
}
