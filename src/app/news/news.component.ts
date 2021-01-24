import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(public newsService: NewsService) { }

  ngOnInit(): void {
  }

  getNews(){
    return this.newsService.getNews();
  }
}
