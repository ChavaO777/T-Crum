import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Technology } from '../../../models/technology.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-technologies-update',
  templateUrl: './technologies-update.component.html',
  styleUrls: ['./technologies-update.component.css']
})
export class TechnologiesUpdateComponent implements OnInit {
  technology: Technology;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.technology = new Technology('', null, null);
    let id = this.route.snapshot.params.id;
    this.crud.retrieve(this.crud.models.TECHNOLOGY, id)
    .subscribe(
      (res: Technology) => {
        this.technology = res;
        console.log(this.technology);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }

  updateTechnology(){
    if(this.validate()){
      this.crud.update(this.crud.models.TECHNOLOGY, this.technology.id, this.technology)
      .subscribe(
        (res:Technology) => {
          this.router.navigate(['technologies']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.errorHandler.handleError(err);
        }
      )
    }

    return false;
  }

  validate(){
    if(!this.technology.name){
      this.errorHandler.showErrorMessage("El campo nombre no puede estar vacío.");
      return false;
    }
    return true;
  }

}
