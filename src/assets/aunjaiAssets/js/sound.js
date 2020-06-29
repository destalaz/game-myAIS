var myAudio = new Audio('../../../assets/aunjaiAssets/sound/MSTR_-_MSTR_-_Choro_bavario_Loop.ogg.mp3');
myAudio.volume = 0.6;
myAudio.addEventListener('ended', function () {

  this.currentTime = 0;
  this.play();
}, false);
myAudio.play();