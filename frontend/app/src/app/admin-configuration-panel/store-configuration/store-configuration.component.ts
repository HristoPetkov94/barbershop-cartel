import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationComponent} from '../../notification/notification.component';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-store-configuration',
  templateUrl: './store-configuration.component.html',
  styleUrls: ['./store-configuration.component.css']
})
export class StoreConfigurationComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

}
