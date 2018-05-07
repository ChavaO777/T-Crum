import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Technology } from '../../../models/technology.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-technologies-create',
  templateUrl: './technologies-create.component.html',
  styleUrls: ['./technologies-create.component.css']
})
export class TechnologiesCreateComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<boolean>();
  technology: Technology;

  constructor(private errorHandler:ErrorHandlerService, private crud:CrudService, private router:Router) { }

  ngOnInit() {
    this.technology = new Technology('', null, null);
  }

  createTechnology(){
    if(this.validate()){
      this.crud.create(this.crud.models.TECHNOLOGY, this.technology)
      .subscribe(
        (res:Technology) => {
          this.technology = new Technology('', null, null);
          this.onSubmit.emit(true);
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
