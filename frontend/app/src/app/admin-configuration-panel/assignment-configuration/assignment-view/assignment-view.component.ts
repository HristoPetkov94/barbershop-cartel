import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {Service} from '../../../models/service';
import {AssignmentService} from '../../../services/assignment.service';
import {Assignment} from '../../../models/assignment';
import {NotificationComponent} from '../../../notification/notification.component';
import {AssignmentEditDialogComponent} from '../assignment-edit-dialog/assignment-edit-dialog.component';
import {MatDialog} from '@angular/material';
import {GlobalConstants} from '../../../common/global.constants';
import {throwToolbarMixedModesError} from '@angular/material/toolbar';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.css', '../../shared-styles/shared.css']
})
export class AssignmentViewComponent implements OnInit, OnChanges {
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  @Input()
  private barberId;

  public services: Service[];
  public assignments: Assignment[];

  public selectedServiceId = 0;

  public selectedService: Service;

  public currency = GlobalConstants.currency;
  public time = GlobalConstants.time;

  constructor(private dialog: MatDialog,
              private serviceService: ServiceService,
              private assignmentService: AssignmentService) {
  }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(services => {
      this.services = services;

      const first = services[0];

      this.selectedService = first;
    });

    this.loadAssignments(this.barberId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadAssignments(this.barberId);
  }

  loadAssignments(barberId) {
    this.assignmentService.getAssignmentsByBarberId(barberId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }

  changeSelectedService() {
    this.selectedService = this.services.find(s => s.id === +this.selectedServiceId);
  }

  getServiceName(serviceId: number) {
     return this.services?.find(s => s.id === serviceId).serviceTitle;
  }

  get availableServices() {

    const res: Service[] = [];

    if (this.services === undefined) {
      return res;
    }

    const unAvailable = [];

    if (this.assignments === undefined) {
      return [];
    }

    for (const assignment of this.assignments) {
      if (assignment.serviceId) {
        unAvailable.push(+assignment.serviceId);
      }
    }

    for (const service of this.services) {

      if (unAvailable.includes(+service.id)) {
        continue;
      }

      res.push(service);
    }

    return res;
  }

  add() {

    if (this.selectedServiceId === undefined) {
      this.notification.showMessage('Please choose service.', 'warn');
      return;
    }

    const newAssignment: Assignment = {
      id: null,
      barberId: this.barberId,
      serviceId: this.selectedServiceId,
      duration: GlobalConstants.DEFAULT_SERVICE_DURATION,
      price: GlobalConstants.DEFAULT_SERVICE_PRICE,
    };

    this.assignmentService.createAssignment(newAssignment).subscribe(assignment => {
      newAssignment.id = assignment.id;

      this.assignments.unshift(newAssignment);
    }, () => {
      this.notification.showMessage('Assignment has not been added successfully.', 'warn');
    }, () => {
      this.notification.showMessage('Assignment has been added successfully.', 'success');
      this.selectedServiceId = 0;
    });
  }

  edit(assignment: Assignment, title) {
    // added for convenience
    assignment.serviceTitle = title;

    const dialogRef = this.dialog.open(AssignmentEditDialogComponent, {
      width: '560px',
      data: Object.assign({}, assignment)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(result);
      }
    });
  }

  private update(result) {
    const assignment: Assignment = result.value;

    this.assignmentService.updateAssignment(assignment).subscribe(() => {
      },
      () => {
        this.notification.showMessage('Assignment has not been updated successfully.', 'warn');
      },
      () => {
        const index = this.assignments.findIndex(ass => ass.id === assignment.id);
        this.assignments[index] = assignment;

        this.notification.showMessage('Assignment has been updated successfully.', 'success');
      }
    );
  }

  delete(assignment, index) {
    if (confirm('Are you sure you want to delete this assignment ?')) {

      this.assignmentService.deleteAssignment(assignment.id).subscribe(() => {
        },
        () => {
          this.notification.showMessage('Assignment has not been deleted successfully.', 'warn');
        },
        () => {
          this.assignments.splice(index, 1);
          this.notification.showMessage('Assignment has been deleted successfully.', 'success');
        }
      );
    }
  }

  isServiceDropdownDisabled() {
    return this.availableServices.length === 0;
  }
}
