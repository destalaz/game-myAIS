import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @HostListener('window:beforeunload')
  beforReload() {

  }

  reportDetail = new Array();
  reportName = new Array();
  reloadData;
  private baseUrl = 'https://iot-apiv3.ais.co.th'

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
      "Access-Control-Allow-Origin": "*"
    })
  };


  bodyOauth = new URLSearchParams({
    "client_secret": "7612efd12f7952634b7a28cf9aff3449",
    "grant_type": "client_credentials",
    "nonce": "game-MyAIS2020060000000",
    "client_id": "JjIVkneVcJuNz6tFQ4Ki5E4QBx6SBcIC37zyEnVK0HQ"
  });

  constructor(private http: HttpClient) { }
  oauth(body: any) {
    let headerOauth = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let urlApi = "/auth/v3.1/oauth/token";
    return this.http.post(this.baseUrl + urlApi, body.toString(), headerOauth);
  }




}
