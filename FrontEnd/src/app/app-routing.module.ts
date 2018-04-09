import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/authentication/login/login.component';
import { AppComponent } from './app.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { TechnologiesListComponent } from './components/technologies/technologies-list/technologies-list.component';
import { AcceptanceCriteriaEditComponent } from './components/acceptance-criteria/acceptance-criteria-edit/acceptance-criteria-edit.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { TechnologiesUpdateComponent } from './components/technologies/technologies-update/technologies-update.component';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/projects/project-update/project-update.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectRetrieveComponent } from './components/projects/project-retrieve/project-retrieve.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';
import { UserStoryCreateComponent } from './components/user-stories/user-story-create/user-story-create.component';
import { UserStoryListComponent } from './components/user-stories/user-story-list/user-story-list.component';
import { UserStoryUpdateComponent} from './components/user-stories/user-story-update/user-story-update.component';
import { TaskUpdateComponent } from './components/tasks/task-update/task-update.component';
import { AcceptanceCriteriaListComponent } from './components/acceptance-criteria/acceptance-criteria-list/acceptance-criteria-list.component';
import { AcceptanceCriteriaCreateComponent } from './components/acceptance-criteria/acceptance-criteria-create/acceptance-criteria-create.component';
import { UserStoryRetrieveComponent } from './components/user-stories/user-story-retrieve/user-story-retrieve.component';

const routes: Routes = [
  { path:'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  {path: 'register', component: MemberCreateComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path:'', component: AppComponent, canActivate: [AuthGuard]},
  // Technologies
  { path: 'technologies', component: TechnologiesListComponent, canActivate: [AuthGuard]},
  { path: 'technologies/update/:id', component: TechnologiesUpdateComponent, canActivate: [AuthGuard]},

  //Acceptance_criteria
  { path:'acceptance-criteria/update/:id', component: AcceptanceCriteriaEditComponent, canActivate: [AuthGuard]},
  { path:'acceptance-criteria/create/:user_story_id', component: AcceptanceCriteriaCreateComponent, canActivate: [AuthGuard]},
  
  //Projects
  {path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
  {path: 'projects/create', component: ProjectCreateComponent, canActivate: [AuthGuard]},
  {path: 'projects/update/:id', component: ProjectUpdateComponent, canActivate: [AuthGuard]},
  {path: 'projects/retrieve/:id', component: ProjectRetrieveComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'tasks/create/:user_story_id', component: TaskCreateComponent, canActivate: [AuthGuard]},
  {path: 'tasks/update/:id', component: TaskUpdateComponent, canActivate: [AuthGuard]},

  //User Stories
  {path: 'user-stories', component: UserStoryListComponent, canActivate: [AuthGuard]},
  {path: 'user-stories/create/:sprint_id', component: UserStoryCreateComponent, canActivate: [AuthGuard]},
  {path: 'user-stories/update/:id', component: UserStoryUpdateComponent, canActivate: [AuthGuard]},
  {path: 'user-stories/:id', component: UserStoryRetrieveComponent, canActivate: [AuthGuard]},

  {path:'', component: AppComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }