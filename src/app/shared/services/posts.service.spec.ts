import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Post } from '../models/posts';
import { firstValueFrom } from 'rxjs';
import { PostService } from './posts.service';
import { provideHttpClient } from '@angular/common/http';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Body 1' },
    { userId: 2, id: 2, title: 'Post 2', body: 'Body 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Assert no unmatched HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from the API', async () => {
    const promise = firstValueFrom(service.fetchPosts());

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);

    const posts = await promise;
    expect(posts).toEqual(mockPosts);
    expect(posts.length).toBe(2);
    expect(posts[0].title).toBe('Post 1');
  });
});
