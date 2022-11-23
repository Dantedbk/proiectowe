import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.page.html',
  styleUrls: ['./dprofile.page.scss'],
})
export class DprofilePage implements OnInit {

  constructor() { }

  ngOnInit() {
      document.getElementById("wea").innerHTML = localStorage.getItem('usuario')
  }

}
