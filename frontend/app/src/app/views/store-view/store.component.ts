import {Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../../services/store.service';
import {NotificationComponent} from '../../notification/notification.component';

@Component({
  selector: 'app-store-view',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

}
