import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Assignment} from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private apiUrl = environment.apiUrl;
  private assignmentsUrl = '/assignments';

  constructor(private http: HttpClient) {
  }

  getAssignments(barberId) {
    return this.http.get<Assignment[]>(this.apiUrl + this.assignmentsUrl + '?barberId='.concat(barberId));
  }

  deleteAssignment(assignmentId) {
    return this.http.delete(this.apiUrl + this.assignmentsUrl + '?assignmentId='.concat(assignmentId));
  }

  createAssignment(assignment: Assignment) {
    return this.http.post<Assignment>(this.apiUrl + this.assignmentsUrl, assignment);
  }

  updateAssignment(assignment: Assignment) {
    return this.http.put<Assignment>(this.apiUrl + this.assignmentsUrl, assignment);
  }
}
