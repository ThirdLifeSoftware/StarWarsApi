import { Component, OnInit } from "@angular/core";
import { Response } from "@angular/http";
import {StarWarsService} from "../service/starwars.service";
import {Character} from '../model/character';
import {CharacterDetail} from '../model/character-detail';
import {Film} from '../model/film';
@Component({
  moduleId: module.id,
  selector: 'star-wars-component',
  templateUrl: `../template/starwars.component.html`,
  styleUrls: ['../css/app.component.css'],
  providers: [
    StarWarsService
  ]
})
export class StarWarsComponent implements OnInit {

  public characters:Character[] = [];
  public selectedCharacterUrl:string;
  public selectedCharacterDetail:CharacterDetail;
  public films:Film[] = [];
  public hasError:string = "";
  constructor(private starWarsService: StarWarsService) {

  }

  public ngOnInit() {
    var defaultOption = new Character("Please Select","-1");
    this.starWarsService.getJsonData().subscribe(data => {
      this.characters = data.characters;
      this.characters.unshift(defaultOption);
      this.selectedCharacterUrl = defaultOption.url;
    },(error:Response) =>
    {
      this.hasError = <any>error;
    });
  }

  onSelectedCharacterChange(e:any) {
    this.hasError = "";
    if (e != "-1"){
      this.starWarsService.getCharacterDetail(e).subscribe(data =>
      {
        this.selectedCharacterDetail = data;
        this.starWarsService.getMultipleFilms(data.films).subscribe(
          (films: Array<Film>) => {
            this.films = films;
          },
          (error:Response) => {
            this.hasError = <any>error;
            this.films = [];
          });
      },(error:Response) => {
        this.hasError = <any>error;
        this.films = [];
      });
    }
    else {
      this.films =[];
    }
  }
}

