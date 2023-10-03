import { HttpClient } from "@angular/common/http";
import { Music } from "./music";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../app-config/app-config.module";
import { map } from "rxjs";

@Injectable()
export class ItuneService {

    private query: String |undefined;

    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config:AppConfig){

    }

    public searchMusic(queryTitle: String){
        this.query = queryTitle
        this.http.get(`${this.config.apiEndPoint}search?term=${this.query}`).pipe(
            map(data=>{
                const res: any = data;
                console.log(res.results);
                return res.results?res.results:[]
            })
        ).subscribe((music)=>'')
    }


    public bookFactory(item: any):Music{
        return new Music(
            item.artistName,
            item.artistViewUrl,
            item.artworkUrl30,
            item.artworkUrl60,
            item.artworkUrl100,
            item.trackId
        )
    }
}