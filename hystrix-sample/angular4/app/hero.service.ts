/**
 * Created by alex on 6/5/17.
 */

import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Headers, Http} from '@angular/http'
import 'rxjs/add/operator/toPromise'


@Injectable()
export class HeroService {
    private herosUrl = 'api/heros';
    constructor(private http: Http){}
    getHeros(): Promise<Hero[]> {
        return this.http.get(this.herosUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHero(id: Number): Promise<Hero> {
        const url = `${this.herosUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An Error Occurred', error);
        return Promise.reject(error.message || error);
    }
}