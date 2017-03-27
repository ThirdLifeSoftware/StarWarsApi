import { Injectable } from "@angular/core";
import { Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {CharacterList} from '../model/character-list';
import {CharacterDetail} from '../model/character-detail';
import {Film} from '../model/film';

@Injectable()
export class StarWarsService {

  constructor(private http: Http) {
  }

  public getCharacterDetail(url:string): Observable<CharacterDetail> {
    return this.http.get(url)
      .map(response => this.extractArray(response))
      .catch(this.handleError);
  }

  public getFilm(url:string): Observable<Film> {
    return this.http.get(url)
      .map(response => this.extractArray(response))
      .catch(this.handleError);
  }

  public getMultipleFilms(urls:string[]): Observable<Array<Film>> {
    let filmObservables = urls.map((url: string, urlIndex: number) => {
      return this.getFilm(url)
        .map(film => film as Film)
        .catch(this.handleError);
    });
    return Observable.forkJoin(filmObservables);
  };

  public getJsonData(): Observable<CharacterList> {
    return this.http.get("./app/data/characters.json")
      .map(response => this.extractArray(response))
      .catch(this.handleError);

  }
  protected extractArray(res: Response, showprogress: boolean = true) {
    let data = res.json();
    return data || [];
  }

  protected handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}


