import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageapiService {

  constructor(private http:HttpClient) { }

  getPackages$() {
    const url = 'http://localhost:8000/api/packages';
    return this.http.get(url)
  }
  createPackage$(pack: any) {
    const url = 'http://localhost:8000/api/newpackage';
    return this.http.post(url, pack)
  }
  updatePackage(pack:any){
    const url = 'http://localhost:8000/api/newpackage'+pack.id;
    return this.http.post(url, pack)
  }
}
