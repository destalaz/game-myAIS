import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class GameService {
    
    private baseUrl = 'https://gameapistg.wisdomcloud.net';
    _tokenParams = sessionStorage.getItem('token');
    // private baseUrl = 'https://gameapi.wisdomcloud.net';
    // private baseUrl = 'http://localhost:3000';




    constructor(private http: HttpClient) { }

    getMobileId(tokenParams: any) {
        // console.log("token send",tokenParams);
        let urlApi = "/api/cms/customer/id";
        let body = { tokenId: tokenParams }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options);
    }

    getPlayDetails(_mobileId: string, _level: Number, tokenParams: String) {
        // console.log("token send",tokenParams);
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

    getPlayResult(_playId: string, cclick: string, tokenParams: String): Promise<any> {
        // console.log("token send",tokenParams);
        let urlApi = "/api/cms/game/result";
        const body =
            { playId: _playId, cclick: cclick }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };
        const getResult = this.http.post(this.baseUrl + urlApi, body, Options).toPromise();
        return getResult;
    }

    getReward(_playId: string, tokenParams: String): Promise<any> {
        // console.log("token send",tokenParams);
        let urlApi = "/api/cms/game/getReward";
        const body =
            { playId: _playId }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenParams,
            })
        };
        const getReward = this.http.post(this.baseUrl + urlApi, body, Options).toPromise();
        return getReward;
    }


}