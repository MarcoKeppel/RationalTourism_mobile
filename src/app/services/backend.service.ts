import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public token: string;
  public username: string;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getSessionToken() {

    return new Observable((observer) => {

      this.httpClient.get<any>(`${environment.BACKEND_URL}/startGame`).subscribe(
        data => {
          console.log(data);
          if (data.result) {
            this.token = data.token;
            observer.next("tokengoeshere");
          }
          else {
            observer.error();
          }
        },
        error => {
          observer.error();
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  registerUser(username: string) {

    this.username = username;
    return this.httpClient.get<any>(`${environment.BACKEND_URL}/setUsername?username=${username}&token=${this.token}`);
  }

  endSession() {
    
    return this.httpClient.get<any>(`${environment.BACKEND_URL}/endGame`);
  }
}
