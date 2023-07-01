import {Component, OnInit} from '@angular/core';
import { Post } from "../../../model/post";
import { PostService } from "../../../services/post.service";


@Component({
  selector: 'app-feed',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  posts: Post[];

  constructor(private postService: PostService) {
    this.posts = new Array<Post>();
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      posts => this.posts = posts
    )
  }

  itemListRemove(toRemovePost: Post): void {
    const id = toRemovePost.id || '';
    this.postService.removePost(id).subscribe(
      removed => {
        console.log(removed);
        const postIndex = this.posts.findIndex(p => p.id === toRemovePost.id);
        if (postIndex > -1){
          this.posts.splice(postIndex, 1)
        }
      }
    )
  }
}
