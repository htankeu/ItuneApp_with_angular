import { HttpClient } from "@angular/common/http";
import { Music } from "./music";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../app-config/app-config.module";
import { map } from "rxjs";

@Injectable()
export class ItuneService {

    private query: String |undefined;
    public musics: Music[]|undefined

    constructor(private http: HttpClient, @Inject(APP_CONFIG) private config:AppConfig){

    }

    public searchMusic(queryTitle: String){
        this.query = queryTitle
        this.http.get(`${this.config.apiEndPoint}search?term=${this.query}`).pipe(
            map(data=>{
                const res: any = data;
                console.log(res.results);
                this.musics = res.results?res.results: []
                return this.musics
            })
        ).subscribe((music)=>'')
    }

    public musicListen(musicId: String){
        return this.http.get(`${this.config.apiEndPoint}lookup/?id=${musicId}`)
    }


    public bookFactory(item: any):Music{
        return new Music(
            item.artistName,
            item.artistViewUrl,
            item.artworkUrl30,
            item.artworkUrl60,
            item.artworkUrl100,
            item.trackName,
            item.collectionName,
            item.trackId,
            item.previewUrl
        )
    }
}