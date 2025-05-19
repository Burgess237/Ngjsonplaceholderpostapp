export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  posts: Post[];
  activePostId: number | null;
}

export const POST_KEYS = Object.keys({
  title: '',
  userId: 0,
  id: 0,
  body: '',
}) as (keyof Post)[];
