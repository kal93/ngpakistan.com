import { Component, OnInit } from '@angular/core';
import { Meetup } from '../../model/meetup.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetupService } from '../../services/meetup.service';

import 'rxjs/add/operator/first';

@Component({
  selector: 'edit-meetup',
  templateUrl: './edit-meetup.component.html',
  styleUrls: ['./edit-meetup.component.css']
})
export class EditMeetupComponent implements OnInit {
  meetup: Meetup;
  disable: boolean;
  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private service: MeetupService) { }

  ngOnInit() {
    this.meetup = this.route
        .snapshot
        .data
        .response
        .data;
  }

  handleSubmit(meetups: Meetup){
    if(!this.disable){
      this.disable = true;
      this.service.update(meetups)
      .first()
      .subscribe( val => this.router.navigate(['../../'], { relativeTo: this.route }),
          err => this.disable = false);
    } 
  }

  onCancel(cancel){
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}