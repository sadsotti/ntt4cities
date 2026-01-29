import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private cd: ChangeDetectorRef
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
}