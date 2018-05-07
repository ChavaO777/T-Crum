import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Member } from '../../../models/member.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-get-member',
  templateUrl: './get-member.component.html',
  styleUrls: ['./get-member.component.css']
})
export class GetMemberComponent implements OnInit {
  
  message: string;
  user: Member;

  constructor(private crud: CrudService, private auth:AuthService) { }

  ngOnInit() {

    this.user = this.auth.getMember();

  }
}
