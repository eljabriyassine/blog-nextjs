export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}
