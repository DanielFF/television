import { map } from 'rxjs/operators';
import { Show } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AsyncSubject } from 'rxjs';

@Injectable()
export class ShowsService {

  private API_BASE_URL = 'http://api.tvmaze.com';

  constructor(private http: HttpClient) { }

  private removeHtmlTags(stringWithHtml) {

    return stringWithHtml ? stringWithHtml.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '') : '';
  }

  private mapImage(image) {
    return image ? image.medium : undefined;
  }

  private mapRating(rating) {
    return rating ? rating.average : undefined;
  }

  private mapImdb(externals) {
    return externals ? externals.imdb : undefined;
  }

  private mapResponseItemToShow({ id, name, rating, externals, summary, image }) {
    const imdb = this.mapImdb(externals);
    rating = this.mapRating(rating);
    summary = this.removeHtmlTags(summary);
    image = this.mapImage(image);

    return {
      id,
      name,
      rating,
      imdb,
      summary,
      image,
    };
  }

  private sanitizeIndexPageResponse(response): Show[] {
    return response.map((responseItem) => this.mapResponseItemToShow(responseItem));
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
    const index$ = new AsyncSubject();
    const result = {
      pages: {},
      pagesCount: 0
    };
    let currentPage = 0;
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
            index$.next(result);
            index$.complete();
          }
        )
    }
    tryConcatPageToResuts(currentPage);

    return index$.asObservable();
  }

  getSearchResults(search: string) {
    return this.http.get(`${this.API_BASE_URL}/search/shows?q=${search}`)
      .pipe(
        map(response => ({ [1]: this.sanitizeSearchResultsResponse(response) }))
      );
  }

}
