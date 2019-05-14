import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    fullUrl = environment.apiUrl + '/api/images';

    constructor(private http: HttpClient) {
    }

    public save(testData: FormData, itemId: number) {
        const params = new HttpParams();
        params.set('itemId', itemId + '');
        return this.http.post(this.fullUrl + '/upload', testData, {params});
    }
}
