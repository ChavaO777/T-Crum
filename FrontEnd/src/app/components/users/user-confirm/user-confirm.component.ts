import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CrudService } from '../../../services/crud.service';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.css']
})
export class UserConfirmComponent implements OnInit {
  constructor(private route: ActivatedRoute, private crud:CrudService, private router:Router, private error:ErrorHandlerService) { }

  ngOnInit() {
    let uuid = this.route.snapshot.params.uuid;
    console.log(uuid);
    this.crud.confirmUser(uuid)
    .subscribe(
      (res:User) => {
        this.error.showInformativeMessage("Cuenta activida. Ya puedes iniciar sesión.");
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        this.error.handleError(err);
        this.router.navigate(['/login']);
      }
    )
  }

}
