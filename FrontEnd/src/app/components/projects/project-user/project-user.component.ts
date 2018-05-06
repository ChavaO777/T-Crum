import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.css']
})
export class ProjectUserComponent implements OnInit {

  project: Project;
  project_roles: string[];
  project_role: string;
  user_id: string;
  users: User[];
  projectUsers: User[];

  constructor(private errorHandler:ErrorHandlerService, private crud: CrudService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.project_roles = ['Scrum Master', 'Developer', 'Architect', 'Product Owner', 'Tester', 'Designer'];
    this.project_role = '';
    this.user_id = '';
    this.getAllUsers();

    let id = this.route.snapshot.params.id;
    this.getProjectUsers(id);
  }

  getAllUsers() {

    this.crud.list(this.crud.models.USER)
      .subscribe(
        (res: User[]) => {
          console.log(res);
          this.users = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }

  getProjectUsers(id: number) {

    this.crud.retrieve(this.crud.models.PROJECT, id)
      .subscribe(
        (res: Project) => {
          console.log(res);
          this.project = res;
          this.projectUsers = res.users;
          console.log(this.projectUsers);
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }

  allFieldsAreSelected() {

    if (!this.user_id || !this.project_role) {

      this.errorHandler.showErrorMessage('Debes seleccionar un miembro y su rol correspondiente.');
      return false;
    }

    return true;
  }

  addUser() {

    if (this.allFieldsAreSelected()) {

      let body = {

        user_id: this.user_id,
        project_id: this.project.id,
        project_role: this.project_role
      }

      this.crud.create(this.crud.models.USER_PROJECT, body)
        .subscribe(
          res => {
            this.project_role = '';
            this.user_id = '';
            this.getProjectUsers(this.project.id);
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        )
    }
  }

}
