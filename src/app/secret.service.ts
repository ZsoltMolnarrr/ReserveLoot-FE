import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  constructor() { }

  getSecret(): string {
    let key = 'secret';
    let secret = localStorage.getItem(key);
    if (secret == null || secret == "") {
      secret = uuid();
      localStorage.setItem(key, secret!);
    }
    return secret!;
  }
}
