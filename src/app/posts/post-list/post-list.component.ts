import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 
  posts: Post[]=[];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  userId: string;
  userIsAuthenticated= false;
 
 isLoading= false;
 totalPosts = 0;
 postsPerPage = 3;
 currentPage= 1;
 pageSizeOptions = [1,2,5,10];
 
 constructor( public postsService: PostsService, private authService: AuthService ){
	 
	 }
	 
	 ngOnInit(){
		 this.postsService.getPosts(this.postsPerPage, this.currentPage);
		 this.isLoading=true;
		 this.userId=this.authService.getUserId();
		 this.postsSub=this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number} )=>{
			 this.isLoading=false;
			 this.posts=postData.posts;
			 this.totalPosts=postData.postCount;
			
		 });
		 this.userIsAuthenticated= this.authService.getIsAuth();
		 this.authStatusSub = this.authService
		 .getAuthStatusListener()
		 .subscribe(isAuthenticated => {
		   this.userIsAuthenticated= isAuthenticated;
		   this.userId=this.authService.getUserId();
		 });
		 
	 }
	 
	 onDelete(postId: string){
		 this.isLoading=true;
		 this.postsService.deletePost(postId).subscribe(()=>{
			 this.postsService.getPosts(this.postsPerPage, this.currentPage);
		}, () => {
			this.isLoading=false;
		});
	 }
	 
	 onChangedPage(pageData: PageEvent){
		 this.isLoading=true;
		 this.currentPage= pageData.pageIndex + 1;
		 this.postsPerPage= pageData.pageSize;
		 this.postsService.getPosts(this.postsPerPage, this.currentPage);
	 }
	 
	 ngOnDestroy(){
		 this.postsSub.unsubscribe(); 
		 this.authStatusSub.unsubscribe();
	 }
}
