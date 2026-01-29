import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, Post, Comment } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, perPage: number = 10, name?: string): Observable<User[]> {
  let params = new HttpParams().set('page', page).set('per_page', perPage);
  if (name) {
    params = params.set('name', name);
  }
  return this.http.get<User[]>(`${this.apiUrl}/users`, { params });
}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/users/${userId}/posts`);
  }

  getPosts(page: number = 1, title?: string): Observable<Post[]> {
    let params = new HttpParams().set('page', page).set('per_page', 10);
    if (title) {
      params = params.set('title', title);
    }
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params });
  }

  createPost(userId: number, post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/users/${userId}/posts`, post);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
  
  createComment(postId: number, comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/posts/${postId}/comments`, comment);
  }
}