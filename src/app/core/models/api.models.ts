export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  isExpanded?: boolean;
  showComments?: boolean;
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}