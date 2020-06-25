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
    private baseUrl = 'http://localhost:3000';

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
        console.log("log=> " ,this.baseUrl + urlApi);
        return this.http.get(this.baseUrl + urlApi);
    }

    cancelLevel(id: string) {
        let urlApi = "/config/cancal";
        console.log(this.baseUrl + urlApi );
        return this.http.post(this.baseUrl + urlApi , { _id : id } );
    }

    createLevel(body: any) {
        let urlApi = "/config/create";
        return this.http.post(this.baseUrl + urlApi , body );
    }


}
