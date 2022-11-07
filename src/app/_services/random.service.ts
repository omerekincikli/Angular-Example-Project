import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  randomString(lenght: number) {
    let str = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i < lenght; i++) {
      str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str;
  }

}
