import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from "rxjs/Observable";


@Injectable()
export class PetsService {
    public _baseUrl: string;
    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    getPets(gender: string, pet_type: string): Observable<string[]> {
        return this._http.get<string[]>(this._baseUrl + 'api/v1/pets?gender=' + gender + '&pet_type=' + pet_type);
    }
    
}