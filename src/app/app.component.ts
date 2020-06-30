import { Component } from '@angular/core';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sound = new Howl({
    src: ['../../../assets/aunjaiAssets/sound/MSTR_-_MSTR_-_Choro_bavario_Loop.ogg.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
  });


  ngOnInit() {
    this.loadSound();
  }



  public loadSound() {
    this.sound.play();
    console.log("loadsound play")
  }

  ngOnDestroy() {
    this.sound.stop();
    console.log('Sound Stop')
  }
}
