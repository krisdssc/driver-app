import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    apiUrl = 'http://localhost:3000';

    constructor(public http: HttpClient) {
        console.log('Hello RestServiceProvider Provider');
    }

    saveUser(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + '/customers', data).subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });
    }

}
