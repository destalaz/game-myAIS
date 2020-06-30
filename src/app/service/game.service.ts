import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class GameService {
    private baseUrl = 'https://gameapistg.wisdomcloud.net'

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Origin": "*"
        })
    };

    constructor(private http: HttpClient) { }

    getMobileId(tokenParams: any) {
        let urlApi = "/api/cms/customer/id";
        let body = { tokenId: tokenParams }
        return this.http.post(this.baseUrl + urlApi, body);
    }

    getPlayDetails(_mobileId: string, _level: Number) {
        let urlApi = "/api/cms/game/detail";
        let body =
            { mobileId: _mobileId, level: _level }
        return this.http.post(this.baseUrl + urlApi, body);
    }

    getPlayResult(_mobileId: string, _playId: string, _resultStatus: boolean) {
        let urlApi = "/api/cms/game/result";
        const body =
            { mobileId: _mobileId, winnerStatus: _resultStatus, playId: _playId }
        return this.http.post(this.baseUrl + urlApi, body);
    }


}
