import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: string;
  password: string;

  constructor(private errorHandler:ErrorHandlerService, private auth:AuthService, private router:Router) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['home'])
    }

    this.id = '';
    this.password = '';
  }

  login(){
    if(this.validate()){
      this.auth.login(this.id, this.password)
      .subscribe(
        res => {
          this.auth.setSession(res);
          this.router.navigate(['projects']);
        },
        err => {
          this.errorHandler.handleError(err);
          this.password = '';
        }
      );
    }
    
    return false;
  }

  validate(){
    if(!this.id || !this.password){
      this.errorHandler.showErrorMessage('Debes introducir tu matrícula y contraseña.');
      return false;
    }
    else{
      return true;
    }
  }
}
