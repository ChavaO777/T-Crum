import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.css']
})

export class MemberUpdateComponent implements OnInit {

  message: string;
  user: Member;

  constructor(private crud:CrudService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
  }
}
