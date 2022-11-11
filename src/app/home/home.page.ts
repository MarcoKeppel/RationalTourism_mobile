import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  username: string;

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) {}

  ngOnInit(): void {
    
    this.backendService.getSessionToken().subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.router.navigate(["map"]);
        }
        else {
          // TODO display error (dedicated page?)
        }
      },
      (error) => {

      }
    );
  }

}
