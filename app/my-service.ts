import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MailChimpResponse {
  result: string;
  msg: string;
}

export class MyService {
  mailChimpEndpoint =
    'https://gmail.us10.list-manage.com/subscribe/post-json?u=aaa7182511d7bd278fb9d510d&amp;id=01681f1b55&amp';
  constructor(private _http: HttpClient) {}

  submitForm(email: string){
     const params = new HttpParams()
				.set('EMAIL', email)
        .set('subscribe','Subscribe')
        .set('b_aaa7182511d7bd278fb9d510d_01681f1b55','')
      // console.log(params);
			const mailChimpUrl = this.mailChimpEndpoint + params.toString();

			return this._http.jsonp<MailChimpResponse>(mailChimpUrl, 'c')
  }

}