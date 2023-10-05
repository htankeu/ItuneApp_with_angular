import { Component, OnInit } from '@angular/core';
import { ItuneService } from '../shared/itune-service';
import { Music } from '../shared/music';
import { ActivatedRoute,Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit{

  music!: Music;

  constructor(private router: Router, private route: ActivatedRoute,public service : ItuneService){
    this.route.params.subscribe((params=>{
      if(params['musicId']){
        console.log(params['musicId'])
        this.getMusic(params['musicId'])
      }
    }))
  }

  getMusic(musicId: String){
    this.service.musicListen(musicId).pipe(
      map(data=>{
          const res: any = data;
          console.log(res.results);
          
          return res.results?res.results: []
      })
  ).subscribe((music)=>this.music=music[0])
  }

  ngOnInit(): void{

  }

  
}
