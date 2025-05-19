import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { PostState } from '../models/posts';

export const initialState: PostState = {
  posts: [],
  activePostId: null,
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts })),
  on(PostActions.setActivePost, (state, { postId }) => ({
    ...state,
    activePostId: postId,
  })),
);
