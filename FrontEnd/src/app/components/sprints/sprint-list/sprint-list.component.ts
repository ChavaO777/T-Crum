import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Sprint } from '../../../models/sprint.model';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {

  sprints: Sprint[];

  constructor(private errorHandler:ErrorHandlerService, private crud: CrudService) { }

  ngOnInit() {

    this.crud.list(this.crud.models.PROJECT)
      .subscribe(
        (res: Sprint[]) => {
          console.log(res);
          this.sprints = res;
        },
        (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
  }

  deleteSprint(id: number) {
    console.log("Deleting")
    this.crud.delete(this.crud.models.SPRINT, id)

    .subscribe(
      (res: Response) => {
        this.errorHandler.showInformativeMessage('Sprint eliminado correctamente');
        let x = 0;

        for (let sprint of this.sprints) {
          if (sprint.id == id) {
            this.sprints.splice(x, 1);
          }

          x++;
        }
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }
}
