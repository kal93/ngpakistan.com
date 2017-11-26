import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  nameHover= 'btn-trial';

  constructor(private router: Router, private UserService: UserService) { }
  showOptions() {
    this.nameHover = 'btn-trial';
  }
  hideOptions(){
    this.nameHover = '';
  }
  ngOnInit() {
  }

}
