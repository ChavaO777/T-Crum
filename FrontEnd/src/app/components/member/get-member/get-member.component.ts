import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { User_image } from '../../../models/user_image';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-get-member',
  templateUrl: './get-member.component.html',
  styleUrls: ['./get-member.component.css']
})
export class GetMemberComponent implements OnInit {
  user_image:User_image;
  user: User;

  constructor(private crud: CrudService, private auth:AuthService, private errorHandler: ErrorHandlerService, private data:DataService) { }

  ngOnInit() {
    this.user = new User('', '', '', '', '', null, null);
    this.user_image = new User_image('', '');

    this.crud.retrieve(this.crud.models.USER, this.auth.getUser().id)
    .subscribe(
      (res:User) => {
        this.user = res;
        this.data.retrive(this.user.id)
        .subscribe(
          (res:User_image) => {
            this.user_image = res;
          },
          (err:HttpErrorResponse) => {
            this.errorHandler.handleError(err);
          }
        )
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    )
  }
}
