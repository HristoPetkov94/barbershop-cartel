import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Assignment} from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private assignmentsUrl = environment.apiUrl + '/assignments';

  constructor(private http: HttpClient) {
  }

  getAssignments(barberId) {
    return this.http.get<Assignment[]>(this.assignmentsUrl + '?barberId='.concat(barberId));
  }

  deleteAssignment(assignmentId) {
    return this.http.delete(this.assignmentsUrl + '?assignmentId='.concat(assignmentId));
  }

  createAssignment(assignment: Assignment) {
    return this.http.post<Assignment>(this.assignmentsUrl, assignment);
  }

  updateAssignment(assignment: Assignment) {
    return this.http.put<Assignment>(this.assignmentsUrl, assignment);
  }
}
