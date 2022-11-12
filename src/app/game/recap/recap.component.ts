import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
})
export class RecapComponent implements AfterViewInit {

  public points: number;
  public type: string;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
  ) { }

  ngAfterViewInit() {
    
    this.route.queryParams.subscribe(
      params => {
        console.log(params["points"]);

        this.points = params["points"];
        this.type = params["type"]
      }
    );
  }

  fabExit() {

    this.backendService.endSession().subscribe();
  }

}
