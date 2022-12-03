import { Component } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  popularMovies!: Movie;
  nowPlayingMovies!: Movie;
  trendingMovies!: Movie;
  topRatedMovies!: Movie;
  upcomingMovies!: Movie;
  originals!: Movie;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getTrendingMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getOriginals();
  }

  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(res => {
      this.popularMovies = this.modifyData(res)
    }, err => {
      console.log(`Error,${err}`)
    })
  }
  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe(res => {
      this.topRatedMovies = this.modifyData(res)
    }, err => {
      console.log(`Error,${err}`)
    })
  }
  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(res => {
      this.upcomingMovies = this.modifyData(res)
    }, err => {
      console.log(`Error,${err}`)
    })
  }
  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(res => {
      this.nowPlayingMovies = this.modifyData(res)
    }, err => {
      console.log(`Error,${err}`)
    })
  }
  getTrendingMovies() {
    this.dataService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = this.modifyData(res)
    }, err => {
      console.log(`Error,${err}`)
    })
  }
  getOriginals() {
    this.dataService.getOriginals().subscribe(res => {
      this.originals = this.modifyData(res)
    }, err => {
      console.log(`Error,${err}`)
    })
  }
  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key
        if (!element.title) {
          element.title = element?.name;
        }
      })
    }
    return movies;
  }
}


