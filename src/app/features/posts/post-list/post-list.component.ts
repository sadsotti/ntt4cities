import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../core/services/data.service';
import { PostFormComponent } from '../post-form/post-form.component';
import { Post, Comment } from '../../../core/models/api.models';

interface PostUI extends Post {
  isExpanded: boolean;
  showComments: boolean;
}

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  allPosts: PostUI[] = [];
  filteredPosts: PostUI[] = [];
  
  commentsCache: { [postId: number]: Comment[] } = {};
  loadingComments: { [postId: number]: boolean } = {};

  constructor(
    private service: DataService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.service.getPosts().subscribe({
      next: (data) => {
        this.allPosts = data.map((post: Post) => ({
          ...post,
          isExpanded: false,   
          showComments: false  
        }));
        this.filteredPosts = this.allPosts;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading posts', err);
        this.snackBar.open('Error loading posts from server', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPosts = this.allPosts.filter(post => 
      post.title.toLowerCase().includes(filterValue) || 
      post.body.toLowerCase().includes(filterValue)
    );
  }

  createPost() {
    const dialogRef = this.dialog.open(PostFormComponent, { 
      width: '500px', 
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPost: PostUI = { 
          ...result, 
          isExpanded: false, 
          showComments: false 
        };
        this.allPosts.unshift(newPost);
        this.filteredPosts.unshift(newPost);
        this.cd.detectChanges();
        this.snackBar.open('Post published successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  toggleComments(post: PostUI) {
    post.showComments = !post.showComments;

    if (post.showComments && !this.commentsCache[post.id]) {
      this.loadingComments[post.id] = true;
      
      this.service.getComments(post.id).subscribe({
        next: (data) => {
          this.commentsCache[post.id] = data;
          this.loadingComments[post.id] = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.loadingComments[post.id] = false;
          this.cd.detectChanges();
        }
      });
    }
  }

  addComment(postId: number, inputElement: HTMLInputElement) {
    const body = inputElement.value.trim();
    if (!body) return;

    const payload = {
      name: 'Admin', 
      email: 'admin@ntt.com', 
      body: body
    };

    this.service.createComment(postId, payload).subscribe({
      next: (newComment) => {
        if (!this.commentsCache[postId]) {
          this.commentsCache[postId] = [];
        }
        
        this.commentsCache[postId].push(newComment);
                inputElement.value = '';
        
        this.snackBar.open('Reply sent!', 'Close', { duration: 3000 });
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error sending reply.', 'Close', { duration: 3000 });
      }
    });
  }
}
