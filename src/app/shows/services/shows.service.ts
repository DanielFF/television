import { Show } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs';

@Injectable()
export class ShowsService {

  constructor(private http: HttpClient) {
  }

  // TODO rewrite to the ts -> find casting to the interface fields problem fix
  private sanitizeResponse(response) {
    return response.map(({ id, name, rating: { average }, externals: { imdb }, summary, image }) => {
      return ({
        id,
        name,
        rating: average,
        imdb,
        summary,
        image: image ? image.medium : void 0
      })
    });
  }

  private getPage(page: number) {
    return this.http.get(`http://api.tvmaze.com/shows?page=${page}`);
  }

  // TODO maybe use rxjs only instead of recursivness, promises (check all operators)
  getPaginatedShows() {
    let currentPage = 0;
    const result = {
      pages: {},
      pagesCount: 0
    };
    const allPagesPromise = new Promise((resolve, reject) => {
      const tryConcatPageToResuts = (page) => {
        this.getPage(currentPage)
          .subscribe(
            (response) => {
              result.pages[currentPage + 1] = this.sanitizeResponse(response);
              currentPage++;
              tryConcatPageToResuts(page);
            },
            () => {
              result.pagesCount = Object.keys(result.pages).length;
              resolve(result);
            }
          )
      }
      tryConcatPageToResuts(currentPage);
    });

    return from(allPagesPromise);
  }


  //TODO for development purposes only
  getMockedList() {
    return from(Promise.resolve({
      pages: {
        1: [
          {

            id: 5750,
            name: 'Mock 1',
            rating: '5.25',
            imdb: 'http://wp.pl',
            summary: `<p>Lovable pug Chip starts kindergarten, makes new friends and tries new things --with a little help from Potato, her secret mouse pal.</p>`,
            image: 'http://static.tvmaze.com/uploads/images/medium_portrait/228/571838.jpg'
          },
          {

            id: 5751,
            name: 'Mock 2',
            rating: '5.2455',
            imdb: 'http://onet.pl',
            summary: `<p>The ex-investigator Finn Kiesewetter has hung up his job to settle on an organic farm in Brandenburg. His life's dream, however, falls victim to a major fire. The Kiesewetter, which also burned down financially, then moves to Lübeck, moves into a room with his two aunts and returns to the police service. The new boss Elke Rasmussen is his former lover.</p>`,
            image: 'http://static.tvmaze.com/uploads/images/medium_portrait/228/572087.jpg'
          }

        ],
        2: [ {

          id: 5722,
          name: 'Mock 4',
          rating: '5.25',
          imdb: 'http://wp.pl',
          summary: `<p>Lovable pug Chip starts kindergarten, makes new friends and tries new things --with a little help from Potato, her secret mouse pal.</p>`,
          image: 'http://static.tvmaze.com/uploads/images/medium_portrait/228/571838.jpg'
        },
        {

          id: 5721,
          name: 'Mock 3',
          rating: '5.2455',
          imdb: 'http://onet.pl',
          summary: `<p>The ex-investigator Finn Kiesewetter has hung up his job to settle on an organic farm in Brandenburg. His life's dream, however, falls victim to a major fire. The Kiesewetter, which also burned down financially, then moves to Lübeck, moves into a room with his two aunts and returns to the police service. The new boss Elke Rasmussen is his former lover.</p>`,
          image: 'http://static.tvmaze.com/uploads/images/medium_portrait/228/572089.jpg'
        }]
      },
      pagesCount: 2
    }));
  }

}
