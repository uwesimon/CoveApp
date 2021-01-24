import { Injectable } from '@angular/core';

export class News {
  id: number;
  title: string;
  source: string;
  foundat: Date;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsList: News[] = [
    {
      id: 1,
      title: "Sicherheits-Update: Apple schließt kritische Lücken auf alten Macs",
      source: 'Heise',
      foundat: new Date("2020-11-12 12:00"),
      url: "https://www.heise.de/news/Sicherheits-Update-Apple-schliesst-kritische-Luecken-auf-alten-Macs-4960291.html"
    },
    {
      id: 1,
      title: "Bauvorschlag 2020: Leiser Allround-PC mit Ryzen-5000-Aufrüstoption",
      source: 'Heise',
      foundat: new Date("2020-11-12 14:00"),
      url: "https://www.heise.de/ratgeber/Bauvorschlag-2020-Leiser-Allround-PC-mit-Ryzen-5000-Aufruestoption-4946260.html?wt_mc=intern.red.plus.plus_buehne.startseite.buehne.buehne"
    },
    {
      id: 1,
      title: "Wetter", source: 'Heise', foundat: new Date("2020-11-12 08:00"), url: "https://www.t-online.de/wetter/"
    }
  ];

  constructor() { }

  public getNews(): News[] {
    return this.newsList;
  }
}

