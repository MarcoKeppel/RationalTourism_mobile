import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) {}

  ngOnInit(): void {
    
    this.backendService.endSession().subscribe(
      data => {

        this.backendService.getSessionToken().subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(["/", "hello"]);
          },
          (error) => {
    
          }
        );
      }
    );   // TODO: this is only to make debugging easier

  }

}
