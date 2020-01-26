import { map } from 'rxjs/operators';
import { Show } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs';

@Injectable()
export class ShowsService {

  private API_BASE_URL = 'http://api.tvmaze.com';

  constructor(private http: HttpClient) { }

  private mapResponseItemToShow({ id, name, rating: { average }, externals: { imdb }, summary, image }) {
    return ({
      id,
      name,
      rating: average,
      imdb,
      summary: summary ? summary.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '') : '',
      image: image ? image.medium : void 0
    })
  }

  private sanitizeIndexPageResponse(response): Show[] {
    return response.map(this.mapResponseItemToShow);
  }

  private sanitizeSearchResultsResponse(response): Show[] {
    return response.map(({ show }) => this.mapResponseItemToShow(show));
  }

  private getIndexPage(page: number) {
    return this.http.get(`${this.API_BASE_URL}/shows?page=${page}`)
      .pipe(
        map(response => this.sanitizeIndexPageResponse(response))
      );
  }

  getIndex() {
    let currentPage = 0;
    const result = {
      pages: {},
      pagesCount: 0
    };
    const allPagesPromise = new Promise((resolve, reject) => {
      const tryConcatPageToResuts = (page) => {
        this.getIndexPage(currentPage)
          .subscribe(
            (response) => {
              result.pages[currentPage + 1] = response;
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

  getSearchResults(search: string) {
    return this.http.get(`${this.API_BASE_URL}/search/shows?q=${search}`)
      .pipe(
        map(response => ({ [1]: this.sanitizeSearchResultsResponse(response) }))
      );
  }

}
