import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostFormComponent
  ],
  imports: [
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }