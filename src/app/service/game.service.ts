import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class GameService {
    // private baseUrl = 'https://gameapistg.wisdomcloud.net';
    _tokenParams = sessionStorage.getItem('token');
    // private baseUrl = 'https://gameapi.wisdomcloud.net';
    private baseUrl = 'http://localhost:3000';

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._tokenParams,
        })
    };


    constructor(private http: HttpClient) { }

    getMobileId(tokenParams: any) {
        let urlApi = "/api/cms/customer/id";
        let body = { tokenId: tokenParams }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options)
    }

    getPlayDetails(_mobileId: string, _level: Number, tokenParams: String) {
        let urlApi = "/api/cms/game/detail";
        let body =
            { mobileId: _mobileId, level: _level }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };

        return this.http.post(this.baseUrl + urlApi, body, Options);
    }

    getPlayResult(_playId: string, cclick: string, tokenParams: String) {
        let urlApi = "/api/cms/game/result";
        const body =
            { playId: _playId, cclick: cclick }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options);
    }

    getReward(_playId: string, tokenParams: String) {
        let urlApi = "/api/cms/game/getReward";
        const body =
            { playId: _playId }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options);
    }


}