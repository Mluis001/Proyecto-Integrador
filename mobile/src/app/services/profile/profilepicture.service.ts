import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';
import { Profilepicture } from './../../models/profile/Profilepicture';

@Injectable({
   providedIn: 'root'
})
export class ProfilepictureService {

   url = environment.api + 'profilepicture/';
   options = new RequestOptions();

   constructor(private http: Http) {
      this.options.headers = new Headers();
      this.options.headers.append('api_token', sessionStorage.getItem('api-token'));
   }

   get(token?): Promise<any> {
      if ( typeof token !== 'undefined') {
         this.options.headers = new Headers();
         this.options.headers.append('api_token', token);
      }
      return this.http.get(this.url, this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { return error.json(); });
   }

   get_paginate(size: number, page: number): Promise<any> {
      return this.http.get(this.url + 'paginate?size=' + size.toString() + '&page=' + page.toString(), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { return error.json(); });
   }

   delete(id: number): Promise<any> {
      return this.http.delete(this.url + '?id=' + id.toString(), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { return error.json(); });
   }

   post(profilepicture: Profilepicture): Promise<any> {
      return this.http.post(this.url, JSON.stringify(profilepicture), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { return error.json(); });
   }

   put(profilepicture: Profilepicture): Promise<any> {
      return this.http.put(this.url, JSON.stringify(profilepicture), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { return error.json(); });
   }

}