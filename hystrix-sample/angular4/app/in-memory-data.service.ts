/**
 * Created by alex on 6/5/17.
 */
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let heroes = [
            {id: 11, name: 'Mr. Cool'},
            {id: 12, name: 'Elliot'},
            {id: 13, name: 'Brandon'},
            {id: 14, name: 'Jimbo'},
            {id: 15, name: 'Mr. Higgs'},
            {id: 16, name: 'Xavier'},
            {id: 17, name: 'Elmer'},
            {id: 18, name: 'Ms. P'},
            {id: 19, name: 'Dan'},
            {id: 20, name: 'Potatahs'}
        ];
        return {heroes};
    }
}
