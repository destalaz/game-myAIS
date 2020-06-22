import { Injectable, HostListener } from '@angular/core';

import ConfigDB from '../db/configDB.json';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigBDService {
  @HostListener('window:beforeunload')
  beforReload() {

  }
  configDB: any = ConfigDB;

  constructor() { }

  getConfig() {
    return this.configDB ;
  }


}
