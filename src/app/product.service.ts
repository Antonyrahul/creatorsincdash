import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getalldata(data):Observable<any>{
    console.log(data)

    // { Authorization: "Bearer " + localStorage.getItem("token")})
    return this.http.post("https://server.antonyrahul.site/getalldata",data)
  }

}
