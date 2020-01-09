import 'rxjs/add/operator/map';

// import 'rxjs/Rx';
// import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {NotifyUserModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private routeURL: String = 'notifyuser';

  constructor(protected http: HttpClient) {}

  create(item: NotifyUserModel) {
    console.log('in register service create '+item);
    return this.http.post(`${this.routeURL}/create`, item);
  }

  // getAll(): Observable<NotifyUserModel> {
    
  //   return this.__get(`${this._url}/index`)
  //   .map(data => { return <InstituteModel>data.json(); }).catch(this.handleError);

  // }
  // update(id: Number, item) {
  //   return this.__put(`${this._url}/update/${id}`, item).map(data => {
  //     return data.json();
  //   });
  // }
}
