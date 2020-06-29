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
    // private baseUrl = 'http://localhost:3000/api/cms';

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
            "Access-Control-Allow-Origin": "*"
        })
    };

    constructor(private http: HttpClient) { }


    getConfig() {
        let urlApi = "/config";
        return this.http.get(this.baseUrl + urlApi);
    }

    login(username: string, password: string) {
        let urlApi = "/config/login";
        return this.http.post(this.baseUrl + urlApi, { username: username, password: password });
    }

    createLevel(body: any) {
        let urlApi = "/config/create/level";
        return this.http.post(this.baseUrl + urlApi, body);
    }


}
