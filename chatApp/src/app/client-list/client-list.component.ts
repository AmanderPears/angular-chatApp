import { Component, OnInit } from '@angular/core';
import { ClientListService } from '../client-list.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  private sub: any;
  clientList: any[] = [];

  constructor(private cls: ClientListService) { }

  ngOnInit() {
    this.sub = this.cls.getClientList().subscribe(
      cl => this.clientList = cl,
      () => console.log("something wrong")
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
