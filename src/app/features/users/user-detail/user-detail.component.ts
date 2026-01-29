import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { User, Post, Comment } from '../../../core/models/api.models';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  posts: Post[] = [];
  comments: { [postId: number]: Comment[] } = {};
  
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private service: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) this.loadData(userId);
  }

  loadData(id: number) {
    this.hasError = false;

    this.service.getUser(id).subscribe({
      next: (u) => {
        this.user = u;
        this.cd.detectChanges();
        this.loadPosts(id);
      },
      error: (err) => {
        console.error('USER ERROR:', err);
        this.hasError = true;
        this.cd.detectChanges();
      }
    });
  }

  loadPosts(userId: number) {
    this.service.getUserPosts(userId).subscribe({
      next: (p) => {
        this.posts = p;
        this.cd.detectChanges();
      }
    });
  }

  toggleComments(postId: number) {
    if (!this.comments[postId]) {
      this.service.getComments(postId).subscribe(c => {
        this.comments[postId] = c;
        this.cd.detectChanges();
      });
    }
  }

  addComment(postId: number, bodyInput: HTMLInputElement) {
    const body = bodyInput.value;
    if (!body) return;
    const newComment = { name: 'Admin', email: 'admin@ntt.com', body, post_id: postId };
    this.service.createComment(postId, newComment).subscribe(comment => {
      if (!this.comments[postId]) this.comments[postId] = [];
      this.comments[postId].push(comment);
      bodyInput.value = '';
      this.cd.detectChanges();
    });
  }
}