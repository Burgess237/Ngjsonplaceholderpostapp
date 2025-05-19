import {
  Component,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, POST_KEYS } from '../../shared/models/posts';
import { setActivePost } from '../../shared/store/post.actions';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-item',
  template: `
    <mat-card class="post-card" [class.active]="isActive" appearance="outlined">
      <mat-card-content>
        {{ currentDisplayValue }}
      </mat-card-content>
      <mat-card-footer>
        {{ keys[displayIndex] }}
      </mat-card-footer>
    </mat-card>
  `,
  styles: `
    .post-card {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      border: 2px solid transparent;
      text-align: center;
    }

    .post-card.active {
      border-color: var(--mat-sys-primary);
      background-color: var(--mat-sys-inverse-primary);
    }

    mat-card-content {
      word-break: break-word;
      overflow: auto;
      height: 100%;
    }
  `,
  imports: [MatCardModule],
})
export class PostItemComponent implements OnInit, OnChanges {
  private store = inject(Store);

  @Input() post!: Post;
  @Input() isActive: boolean = false;

  displayIndex = 0;
  keys = POST_KEYS;
  currentDisplayValue!: string;

  ngOnInit() {
    this.currentDisplayValue = this.post.title;
  }

  ngOnChanges() {
    if (!this.isActive) {
      this.displayIndex = 0;
      this.currentDisplayValue = this.post.title;
    }
  }

  @HostListener('click')
  onClick() {
    this.store.dispatch(setActivePost({ postId: this.post.id }));
    this.displayIndex = (this.displayIndex + 1) % this.keys.length;
    const key = this.keys[this.displayIndex];
    this.currentDisplayValue = this.post[key].toString();
  }
}
