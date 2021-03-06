import { Component, OnInit } from '@angular/core';
import { Meetup } from '../../model/meetup.interface';
import { Speaker } from '../../model/speaker.interface';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { MeetupService } from '../../services/meetup.service';

import { first } from 'rxjs/operator/first';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetup-detail.component.html',
  styleUrls: ['./meetup-detail.component.css']
})
export class MeetupDetailComponent implements OnInit {
  meetup: Meetup;
  userSubscribed = false;
  userApproved = false;
  userService;
  pastEvent;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meetupService: MeetupService,
    userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.meetup = this.route
        .snapshot
        .data
        .meetup
        .data;
    this.pastEvent = Date.now() > Date.parse(this.meetup.date);
    if (this.userService.getUser()) {
      this.meetup.subscribers.forEach(subscriber => {
        if (subscriber.user === this.userService.getUser().id) {
          if (subscriber.confirmed) {
            this.userApproved = true;
          }
          this.userSubscribed = true;
        }
      });
    }
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onSubscribe() {
    const userID = this.userService.getUser().id;
    this.meetupService
      .addSubscriber(this.meetup._id, userID)
      .first()
      .subscribe(res => {
        this.userSubscribed = true;
      });
  }
}
