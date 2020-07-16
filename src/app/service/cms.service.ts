import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CmsService {
    @HostListener('window:beforeunload')
    beforReload() {

    }

    reportDetail = new Array();
    reportName = new Array();
    reloadData;
    private baseUrl = 'https://gameapistg.wisdomcloud.net/api/cms';
    // private baseUrl = 'https://gameapi.wisdomcloud.net/api/cms';
    // private baseUrl = 'http://localhost:3000/api/cms';

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Headers": "*"
        })
    };

    constructor(private http: HttpClient) { }


    getConfig() {
        let urlApi = "/config";
        return this.http.get(this.baseUrl + urlApi );
    }

    login(username: string, password: string) {
        let urlApi = "/config/login";
        return this.http.post(this.baseUrl + urlApi, { username: username, password: password } );
    }

    createLevel(body: any) {
        let urlApi = "/config/create/level";
        return this.http.post(this.baseUrl + urlApi, body );
    }

    rewardLimit(_rewardLimit: any) {
        let urlApi = "/config/rewardlimit";
        var _data = { rewardLimit: _rewardLimit }
        return this.http.post(this.baseUrl + urlApi, _data  );
    }

    getReport() {
        let urlApi = "/config/report";
        return this.http.get(this.baseUrl + urlApi );
    }

    getReportTime( _stDate, _enDate ) {
        let urlApi = "/config/report/time";
        return this.http.post(this.baseUrl + urlApi ,  { st_time: _stDate, en_time: _enDate } );
    }

}
