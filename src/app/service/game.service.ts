import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class GameService {
    private baseUrl = 'https://gameapistg.wisdomcloud.net';
    // private baseUrl = 'https://gameapi.wisdomcloud.net';
    // private baseUrl = 'http://localhost:3000';
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer "+  sessionStorage.getItem('token'),
        })
    };


    constructor(private http: HttpClient) { }

    getMobileId(tokenParams: any) {
        let urlApi = "/api/cms/customer/id";
        let body = { tokenId: tokenParams }
        return this.http.post(this.baseUrl + urlApi, body,this.httpOptions);
    }

    getPlayDetails(_mobileId: string, _level: Number) {
        let urlApi = "/api/cms/game/detail";
        let body =
            { mobileId: _mobileId, level: _level }
        return this.http.post(this.baseUrl + urlApi, body,this.httpOptions);
    }

    getPlayResult(_playId: string, cclick: string) {
        let urlApi = "/api/cms/game/result";
        const body =
            { playId: _playId, cclick:cclick}
        return this.http.post(this.baseUrl + urlApi, body,this.httpOptions);
    }

    getReward(_playId: string) {
        let urlApi = "/api/cms/game/getReward";
        const body =
            { playId: _playId}
        return this.http.post(this.baseUrl + urlApi, body,this.httpOptions);
    }


}