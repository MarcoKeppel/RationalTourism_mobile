import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  getSessionToken() {

    return new Observable((observer) => {

      observer.next("tokengoeshere");
      observer.complete();
    });
  }
}
