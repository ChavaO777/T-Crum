import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Acceptance_criteria } from '../../../models/acceptance_criteria.model';
import { User_story } from '../../../models/user_story.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-acceptance-criteria-create',
  templateUrl: './acceptance-criteria-create.component.html',
  styleUrls: ['./acceptance-criteria-create.component.css']
})
export class AcceptanceCriteriaCreateComponent implements OnInit {
  acceptance_criteria: Acceptance_criteria;
  user_story: User_story;

  constructor(private errorHandler:ErrorHandlerService, private crud: CrudService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.acceptance_criteria = new Acceptance_criteria(null, null, null, null, null, null);
    let user_story_id = this.route.snapshot.params.user_story_id;
    this.acceptance_criteria.user_story_id = user_story_id;
  }

  create(){
    if(this.validate()){
      this.crud.create(this.crud.models.ACCEPTANCE_CRITERIA, this.acceptance_criteria)
      .subscribe(
        (res:Acceptance_criteria) => {
          this.acceptance_criteria = res;
          this.router.navigate(['/user-stories/'+this.acceptance_criteria.user_story_id]);
        },
        (err:HttpErrorResponse) => {
          this.errorHandler.handleError(err);
        }
      )
    }
    return false;
  }

  validate(){
    if(!this.acceptance_criteria.name){
      this.errorHandler.showErrorMessage('Debes introducir el nombre del criterio de aceptación.');
      return false;
    }
    if(!this.acceptance_criteria.type){
      this.errorHandler.showErrorMessage('Debes introducir el tipo del criterio de aceptación.');
      return false;
    }
    if(!this.acceptance_criteria.user_story_id){
      this.errorHandler.showErrorMessage('No hay historia de usuario relacionada');
      return false;
    }
    else{
      console.log('Validado');
      return true;
    }
  }

  onSelectCancel(){
    this.router.navigate(['/user-stories/'+this.acceptance_criteria.user_story_id]);
  }

}
