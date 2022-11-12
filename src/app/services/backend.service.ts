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
  public totem: { lat: number, lng: number } = { lat: 51.0, lng: 0.0 };

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
            this.totem = data.totem;
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

  sendPosition(position) {

    return this.httpClient.get<any>(`${environment.BACKEND_URL}/submitPhaseOne?token=${this.token}&lat=${position.lat}&lng=${position.lng}`);
  }

  getQuiz() {

    return this.httpClient.get<any>(`${environment.BACKEND_URL}/phaseTwo`);
  }

  sendQuiz(score: number) {

    return this.httpClient.get<any>(`${environment.BACKEND_URL}/submitPhaseTwo?token=${this.token}&score=${score}`);
  }

  getQuiz2() {

    return this.httpClient.get<any>(`${environment.BACKEND_URL}/phaseThree`);
  }

  sendQuiz2(score: number) {

    return this.httpClient.get<any>(`${environment.BACKEND_URL}/submitPhaseThree?token=${this.token}&score=${score}`);
  }

  endSession() {
    
    return this.httpClient.get<any>(`${environment.BACKEND_URL}/endGame`);
  }
}
