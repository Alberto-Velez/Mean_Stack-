
import {DemoService} from './demo.service';
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from "angular2/common";
import {HTTP_PROVIDERS} from 'angular2/http';


@Component({
  selector: 'demo-app',
  template:`
  <h1>Angular2 HTTP Demo App</h1>

  <form f="postForm" (ngSubmit)="doPost()">
      <button type="submit" class="btn btn-warning btn-lg">POST</button>
      <input [(ngModel)]="call_post" placeholder="0">
  </form>

  <h2>Foods</h2>
  <ul>
<li *ngFor="#post of posts">{{post.name}}</li>
  </ul>
  <h2>Books and Movies</h2>
  <h3>Books</h3>
  <ul>
    <li *ngFor="#book of books">{{book.title}}</li>
  </ul>
  <h3>Movies</h3>
  <ul>
    <li *ngFor="#movie of movies">{{movie.title}}</li>
  </ul>
  `,

})
export class AppComponent {


  public posts;
  public books;
  public movies;
  public call_post;

  constructor(private _demoService: DemoService) { }

  ngOnInit() {
    this.getPost();
    this.getBooksAndMovies();

  }

  doPost() {

    this._demoService.post(this.call_post);

   }

  getPost() {
    this._demoService.getPost().subscribe(
      // the first argument is a function which runs on success
      data => { this.posts = data},
      // the second argument is a function which runs on error
      err => console.error(err),
     
     
    );
  }

  getBooksAndMovies() {
    this._demoService.getBooksAndMovies().subscribe(
      data => {
        this.books = data[0]
        this.movies = data[1]
      }
      // No error or completion callbacks here. They are optional, but
      // you will get console errors if the Observable is in an error state.
    );
  }
}
