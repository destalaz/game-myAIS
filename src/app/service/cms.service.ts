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
    private baseUrl = 'http://localhost:3000'

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
            "Access-Control-Allow-Origin": "*"
        })
    };

    constructor(private http: HttpClient) { }


    getConfig() {
        let urlApi = "/cms/config";
        return this.http.get(this.baseUrl + urlApi);
    }

    cancelLevel(id: string) {
        let urlApi = "/cms/config/cancal";
        return this.http.put(this.baseUrl + urlApi , id );
    }

    createLevel(body: any) {
        let urlApi = "/cms/config/create";
        return this.http.post(this.baseUrl + urlApi , body );
    }


}
