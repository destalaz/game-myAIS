import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root'
})
export class GameService {
    //prod
    // private baseUrl = ' https://rewardflip-phase2-api.wisdomcloud.net';
    //stg
    private baseUrl = 'https://rewardflip-phase2-apistg.wisdomcloud.net/rewardflip-phase2';
    private Mode: string = '';
    private secret = 'nnvdJ#3x,!DUKrP">I^s#.62MoZk*,znCiwsAYr4RWNQ2lkDEFdzTqCF10uod2';
    // _tokenParams = sessionStorage.getItem('token');
    // private baseUrl = 'http://localhost:3000';
    server: string = '';


    constructor(private http: HttpClient) {
        //select Mode local / Host
          //this.Mode = 'local';
        this.Mode = 'host';
        if (this.Mode == 'host') {
            this.server = '../rewardflip/';
        } else if (this.Mode == 'local') {
            this.server = '';
        }

    }

    getAuthen(tokenParams: any): Observable<any> {
        let urlApi = "/customer/ssbeserv/authenToken";
        let body = { token: tokenParams }
        return this.http.post(this.baseUrl + urlApi, body);
    }

    reedeemPoint(): Observable<any> {
        let urlApi = "/game/play";
        let profile = this.storageDecrypt(localStorage.getItem('profile'));
        let body =
            { token: profile.token }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + profile.token,
                "transactionid": profile.transactionID,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options);
    }

    playResult(cclick: string, optionsGame: String): Observable<any> {
        let urlApi = "/game/save";
        let profile = this.storageDecrypt(localStorage.getItem('profile'));
        const body =
        {
            o: localStorage.getItem('playId'),
            cclick: cclick,
            optionsGame: optionsGame
        }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + profile.token,
                "transactionid": profile.transactionID,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options);

    }

    getReward(): Observable<any> {
        let profile = this.storageDecrypt(localStorage.getItem('profile'));
        let urlApi = "/game/award";
        const body =
            { o: localStorage.getItem('playId') }
        let Options = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + profile.token,
                "transactionid": profile.transactionID,
            })
        };
        return this.http.post(this.baseUrl + urlApi, body, Options);
    }


    decrypt(data) {
        return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, this.secret,
            {
                keySize: 128 / 8,
                iv: this.secret,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            })));
    }


    encodeAns(cclick) {
        try {
            const result = CryptoJS.AES.encrypt(cclick, this.secret).toString();
            return result;
        } catch (e) {
        }
    }
    storageEncrypt(data) {
        var ciphertext = CryptoJS.AES.encrypt(data, this.secret).toString();
        return ciphertext;

    }
    storageDecrypt(data) {
        var bytes = CryptoJS.AES.decrypt(data, this.secret);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText)
    }

}