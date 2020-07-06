function gamePause() {

}


var params = document.body.getElementsByTagName('script');
query = params[0].classList;
var param_a = query[0];
var param_b = query[1];
var param_c = query[2];

var soundGame, soundFlip, obj1;
$(document).ready(function () {
  (function () {
    var box1 = $("#box1"),
      divBtn = $("#divBtn"),
      box2 = $("#box2"),
      box3 = $("#box3"),
      kick = $("#kick_jump"),
      HeaderText = $("#heading-Text"),
      startButton = $("#start_game"),
      messageRound = $("#msg_bd"),
      kickDropDownAnimationDelay = 1200,
      btnResume = $("#btn_resume"),
      btnClose = $("#btn_close"),
      bodyPopup = $("#body-popup"),
      cup1 = $("#img-Round-cup1"),
      cup2 = $("#img-Round-cup2"),
      cup3 = $("#img-Round-cup3"),
      cup4 = $("#img-Round-cup4"),
      cup5 = $("#img-Round-cup5"),
      btnResume1 = $("#btn_resume1"),
      btnResume2 = $("#btn_resume2"),
      btnResume3 = $("#btn_resume3"),
      btnResume4 = $("#btn_resume4"),
      btnResume5 = $("#btn_resume5"),
      bodyWin = $("#body-popup-win"),
      counNumnOfShuffels = 0,
      cclick, secure, ans,
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      playId = sessionStorage.getItem('playId'),
      click = false,
      bodyLose = $("#body-popup-lose"),
      shuffleSpeedLeft, shuffleSpeedTop;

    if (localStorage.getItem('sumcclick') === null) {
      localStorage.setItem('sumcclick', "");
    }

    if (localStorage.getItem('countWin') === null) {
      localStorage.setItem('countWin', "1");
    }



    var data = JSON.parse(localStorage.getItem('config'));
    var index = parseInt(localStorage.getItem('countWin')) - 1;





    soundGame = new Howl({
      src: ['../../../assets/aunjaiAssets/sound/MSTR_-_MSTR_-_Choro_bavario_Loop.ogg.mp3'],
      loop: true,
      volume: 0.05,
    });

    var soundFlip = new Howl({
      src: ['../../../assets/aunjaiAssets/sound/LONGTUNE.mp3'],
      loop: true,
      volume: 0.2,
    });
    var soundLose = new Howl({
      src: ['../../../assets/aunjaiAssets/sound/HORNNOTS.mp3'],
      volume: 0.2,
    });
    var soundWin = new Howl({
      src: ['../../../assets/aunjaiAssets/sound/XYLO0.mp3'],
      volume: 0.2,
    });


    function change_cup() {
      if (localStorage.getItem('totalRound') === "3") {
        cup1.css('display', 'inline-block');
        cup2.css('display', 'inline-block');
        cup3.css('display', 'inline-block');
        cup4.css('display', 'none');
        cup5.css('display', 'none');
      } else if (localStorage.getItem('totalRound') === "4") {
        cup1.css('display', 'inline-block');
        cup2.css('display', 'inline-block');
        cup3.css('display', 'inline-block');
        cup4.css('display', 'inline-block');
        cup5.css('display', 'none');
      } else if (localStorage.getItem('totalRound') === "5") {
        cup1.css('display', 'inline-block');
        cup2.css('display', 'inline-block');
        cup3.css('display', 'inline-block');
        cup4.css('display', 'inline-block');
        cup5.css('display', 'inline-block');
      }




      if (localStorage.getItem('countWin') === "1") {
        cup1.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup2.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup3.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup4.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup5.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
      } else if (localStorage.getItem('countWin') === "2") {
        cup1.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup2.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup3.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup4.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup5.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
      } else if (localStorage.getItem('countWin') === "3") {
        cup1.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup2.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup3.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup4.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup5.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
      } else if (localStorage.getItem('countWin') === "4") {
        cup1.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup2.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup3.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup4.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
        cup5.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
      }
      else if (localStorage.getItem('countWin') === "5") {
        cup1.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup2.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup3.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup4.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup5.css({ 'opacity': '0.2' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=20)' }, { '-moz-opacity': '0.2' }, { '-khtml-opacity': '0.2' });
      }
      else if (localStorage.getItem('countWin') === "6") {
        cup1.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup2.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup3.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup4.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
        cup5.css({ 'opacity': '1' }, { '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)' }, { '-moz-opacity': '1' }, { '-khtml-opacity': '1' });
      }
    }

    function slide_out() {
      console.log(localStorage.getItem('sumcclick'));
      kick.css({ left: ans_position_left });
      win = false;
      kick.show();
      kick.animate({
        top: "56%",
        left: ans_position_left
      }, {
        duration: 400,
        specialEasing: {
          top: 'easeInQuint'
        }
      });
      HeaderText.show();
      HeaderText.html('<img src="../../assets/aunjaiAssets/header/win_ic.svg" id="box_o_t"  style="width:60vw; zoom:100%;">');
      HeaderText.show();
      HeaderText.animate({
        top: "17vh"
      }, {
        duration: 400,
        specialEasing: {
          top: 'easeInQuint'
        }
      });
      setTimeout(() => {

        win_now = parseInt(localStorage.getItem('countWin')) + parseInt(1);
        localStorage.setItem('countWin', win_now);
        change_cup();


        if (localStorage.getItem('countWin') === "1") {
          btnResume1.show();
          bodyPopup.show();
        } else if (localStorage.getItem('countWin') === "2") {
          btnResume2.show();
          bodyPopup.show();
        } else if (localStorage.getItem('countWin') === "3") {
          if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
            bodyWin.show();
            var resultGameWin = $("#resultGameWin");
            resultGameWin.click();
          } else {
            btnResume3.show();
            bodyPopup.show();
          }
        } else if (localStorage.getItem('countWin') === "4") {
          if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
            bodyWin.show();
            var resultGameWin = $("#resultGameWin");
            resultGameWin.click();
          } else {
            btnResume4.show();
            bodyPopup.show();
          }
        }
        else if (localStorage.getItem('countWin') === "5") {
          if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
            bodyWin.show();
            var resultGameWin = $("#resultGameWin");
            resultGameWin.click();
          } else {
            btnResume5.show();
            bodyPopup.show();
          }
        }
        else if (localStorage.getItem('countWin') === "6") {
          if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
            bodyWin.show();
            var resultGameWin = $("#resultGameWin");
            resultGameWin.click();
          } else {
            btnResume5.show();
            bodyPopup.show();
          }
        }
      }, 3000);
    }

    function gameOver() {
      localStorage.setItem('resumeGame', true);
      var checkGameOver = $("#checkOverGame");
      checkGameOver.click();
      localStorage.setItem('countWin', '1');

      localStorage.setItem('gameOver', "true");
      // ตรงนี้ใส่ฟังชันกดใช้ปุ่ม id="checkOverGame"


      win = false;
      // divBtn.show();
      // countWin = 1;


      setTimeout(() => {
        localStorage.setItem('countWin', 1);
        bodyLose.show();
      }, 2000);
    }

    function chk_Choose_click() {
      $('#heading-Text').stop();
      $('#heading-Text').hide();
      if (!click) {
        gameOver();
      }
    }


    function text_round() {
      setMessage("Game" + "&nbsp;" + localStorage.getItem('countWin') + "&nbsp;" + "of" + "&nbsp;" + localStorage.getItem('totalRound'));
    }




    function setMessage(message) {
      messageRound.html(message);
    }

    function reset_position() {

      box1.html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="transform: rotate(180deg); width:30vw;">');
      box2.html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="transform: rotate(180deg); width:30vw;">');
      box3.html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="transform: rotate(180deg); width:30vw;">');
      kick.css({ top: '0px', left: '0px' });
      box1.css({ left: '0vw', top: '0px', position: 'absolute' });
      box2.css({ left: '33vw', top: '0px', position: 'absolute' });
      box3.css({ left: '66vw', top: '0px', position: 'absolute' });

    }



    function ready_game() {
      $('#heading-Text').html('<img src="../../assets/aunjaiAssets/component/random_bg@2x.png" id="box_o_t"  style="width:64vw;"><div style="position: absolute;font-size:20vw; font-style:italic;">3</div>').fadeIn(200).delay(600).fadeOut(200, round2);
      function round2() {
        $('#heading-Text').html('<img src="../../assets/aunjaiAssets/component/random_bg@2x.png" id="box_o_t"  style="width:64vw;"><div style="position: absolute;font-size:20vw; font-style:italic;">2</div>').fadeIn(200).delay(600).fadeOut(200, round3);
      }
      function round3() {
        $('#heading-Text').html('<img src="../../assets/aunjaiAssets/component/random_bg@2x.png" id="box_o_t"  style="width:64vw;"><div style="position: absolute;font-size:20vw; font-style:italic;">1</div>').fadeIn(200).delay(600).fadeOut(200);
      }
    }

    function end_game() {
      $('#heading-Text').html('<img src="../../assets/aunjaiAssets/random_number/5.png" id="box_o_t"  style="width:36vw;">').fadeIn(200).delay(600).fadeOut(200, round4);
      function round4() {
        if (click) {
          $('#heading-Text').stop();
          $('#heading-Text').hide();
          chk_Choose_click();
        } else {
          $('#heading-Text').html('<img src="../../assets/aunjaiAssets/random_number/4.png" id="box_o_t"  style="width:36vw;">').fadeIn(200).delay(600).fadeOut(200, round3);
        }

      }
      function round3() {
        if (click) {
          $('#heading-Text').stop();
          $('#heading-Text').hide();
          chk_Choose_click();
        } else {
          $('#heading-Text').html('<img src="../../assets/aunjaiAssets/random_number/3.png" id="box_o_t"  style="width:36vw;">').fadeIn(200).delay(600).fadeOut(200, round2);
        }

      }
      function round2() {
        if (click) {
          $('#heading-Text').stop();
          $('#heading-Text').hide();
          chk_Choose_click();
        } else {
          $('#heading-Text').html('<img src="../../assets/aunjaiAssets/random_number/2.png" id="box_o_t"  style="width:36vw;">').fadeIn(200).delay(600).fadeOut(200, round1);
        }

      }
      function round1() {
        if (click) {
          $('#heading-Text').stop();
          $('#heading-Text').hide();
          chk_Choose_click();
        } else {
          $('#heading-Text').html('<img src="../../assets/aunjaiAssets/random_number/1.png" id="box_o_t"  style="width:36vw;">').fadeIn(200).delay(500).fadeOut(600, chk_Choose_click);
        }
      }
    }



    function check_round_img() {
      if (localStorage.getItem('countWin') === "2") {
        HeaderText.html('<img src="../../assets/aunjaiAssets/header/game2_ic@2x.png" id="box_o_t"  style="width:60vw;">');
      } else if (localStorage.getItem('countWin') === "3") {
        HeaderText.html('<img src="../../assets/aunjaiAssets/header/game3_ic@2x.png" id="box_o_t"  style="width:60vw;">');
      }

    }






    change_cup();
    text_round();
    check_round_img();
    startButton.on("click", function startGame(event) {
      $('#heading-Text').html('');
      $('#heading-Text').hide();
      Howler.stop();
      soundGame.stop();
      soundGame.play();
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          Howler.mute(true);
        } else {
          Howler.mute(false);
        }
      }, false);




      //start shuffle
      function gamepPlay() {
        {
          var myTimeout;
          counNumnOfShuffels++;

          var array = shuffle([1, 2, 3]);
          $("#box" + array[0]).css("z-index", "100");
          $("#box" + array[1]).css("z-index", "300");
          $("#box" + array[2]).css("z-index", "200");

          $("#box" + array[0]).animate({
            top: ($("#box" + array[2]).position().top) - 40 + "px"
          }, {
            duration: shuffleSpeedTop,
          });

          $("#box" + array[0]).animate({
            left: $("#box" + array[1]).position().left + "px",
          }, {
            duration: shuffleSpeedLeft,
          });
          $("#box" + array[0]).animate({
            top: ($("#box" + array[2]).position().top) + "px"
          }, {
            duration: shuffleSpeedTop,
          });


          $("#box" + array[1]).animate({
            top: ($("#box" + array[2]).position().top) + 40 + "px"
          }, {
            duration: shuffleSpeedLeft,
          });

          $("#box" + array[1]).animate({
            left: $("#box" + array[0]).position().left + "px",
          }, {
            duration: shuffleSpeedLeft,
          });

          $("#box" + array[1]).animate({
            top: ($("#box" + array[2]).position().top) + "px"
          }, {
            duration: shuffleSpeedTop
            , complete: function () {
              $("#box" + array[0]).css("z-index", "0");
              $("#box" + array[1]).css("z-index", "0");
              $("#box" + array[2]).css("z-index", "0");

              if (counNumnOfShuffels < nuberOfShuffels) {
                gamepPlay();
                document.addEventListener('visibilitychange', function () {
                  if (document.hidden) {

                  } else {
                    $("#body-popup-puse").show();
                    setTimeout(() => {
                      $("#body-popup-puse").hide();
                    }, 800);
                  }
                }, false);

              } else {
                setTimeout(() => {
                  soundFlip.stop();
                  var flag = 0;
                  end_game();
                  box1.click(function () {
                    if (flag == 0) {
                      click = true;
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2070@2xmin.png" id="box_o_t" style="width:30vw;">');
                      box1.animate({
                        top: $(this).position().top + -20 + "vh"
                      });
                      if (ans == 1) {
                        flag = 1;
                        change_cup();
                        flag = 1;
                        ans_position_left = box1.position().left;
                        soundWin.fade(1, 0, 1200, soundWin.play());
                        cclick = '';
                        cclick += characters.charAt(Math.floor(Math.random() * characters.length));
                        cclick += String.fromCharCode(64 + ans);
                        var cclickDf = localStorage.getItem('sumcclick');
                        var totolclick = cclickDf + cclick;
                        localStorage.setItem('sumcclick', totolclick);
                        slide_out();
                      } else {
                        flag = 1;
                        soundLose.fade(1, 0, 1500, soundLose.play());
                        gameOver();
                      }
                    }
                  });

                  box2.click(function () {
                    if (flag == 0) {
                      click = true;
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2070@2xmin.png" id="box_o_t" style="width:30vw;" >');
                      box2.animate({
                        top: $(this).position().top - 20 + "vh"
                      });
                      if (ans == 2) {
                        flag = 1;
                        change_cup();
                        ans_position_left = box2.position().left;
                        soundWin.fade(1, 0, 1500, soundWin.play());
                        cclick = '';
                        cclick += characters.charAt(Math.floor(Math.random() * characters.length));
                        cclick += String.fromCharCode(64 + ans);
                        var cclickDf = localStorage.getItem('sumcclick');
                        var totolclick = cclickDf + cclick;
                        localStorage.setItem('sumcclick', totolclick);
                        slide_out();
                      } else {
                        flag = 1;
                        soundLose.fade(1, 0, 1500, soundLose.play());
                        gameOver();
                      }
                    }
                  });

                  $("#box3").click(function () {
                    if (flag == 0) {
                      click = true;
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2070@2xmin.png" id="box_o_t"  style="width:30vw;">');
                      box3.animate({
                        top: $(this).position().top + -20 + "vh"
                      });
                      if (ans == 3) {
                        change_cup();
                        flag = 1;
                        ans_position_left = box3.position().left;
                        soundWin.fade(1, 0, 1200, soundWin.play()); soundWin.fade(1, 0, 1500, soundWin.play());
                        cclick = '';
                        cclick += characters.charAt(Math.floor(Math.random() * characters.length));
                        cclick += String.fromCharCode(64 + ans);
                        var cclickDf = localStorage.getItem('sumcclick');
                        var totolclick = cclickDf + cclick;
                        localStorage.setItem('sumcclick', totolclick);
                        slide_out();
                      } else {
                        flag = 1;
                        soundLose.fade(1, 0, 1500, soundLose.play());
                        gameOver();
                      }
                    }
                  });
                }, 10);
              }
            },


          })

        }
      }


      var nuberOfShuffels = data[index].flipAmt;
      var shuffleSpeed = data[index].speed;
      shuffleSpeed = 40 + (shuffleSpeed / 2);
      shuffleSpeedTop = shuffleSpeed / 5;
      shuffleSpeedLeft = shuffleSpeed / 2;

      ready_game();

      if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
        localStorage.setItem('countWin', 1);
      }

      btnResume.click(function () {
        bodyPopup.hide();
      });

      divBtn.hide();
      HeaderText.show();
      divBtn.hide();
      HeaderText.show();
      secure = playId.substr(playId.length - 8);
      countwin = parseInt(localStorage.getItem('countWin') - 1);
      ans = (parseInt(secure.charAt(countwin)) % 3) + 1;
      console.log("this ans", ans);
      var kickInitialPosition = 0;
      reset_position();
      divBtn.hide();

      kick.show();


      // Move kick Under the relative box based on answer


      // Update the initial position based on the answer
      kickInitialPosition = 30 + ((ans - 1) * 240);


      if (ans === 1) {
        kickInitialPosition = box1.position().left;
      } else if (ans === 2) {
        kickInitialPosition = box2.position().left;
      } else {
        kickInitialPosition = box3.position().left;
      }

      kick.css({
        left: kickInitialPosition + "px"
      });

      // Droping kick from the top into the box.
      kick.animate({
        top: "50%"
      }, {
        duration: kickDropDownAnimationDelay,
        specialEasing: {
          top: 'easeOutBounce'
        },
        complete: function () {
          kick.html("<img src='../../../assets/aunjaiAssets/avatar/min/Cloth_Point_02@2x-min.png' style='width:28vw;' />");
          kick.animate({
            top: "52%"
          }, {
            duration: 500,
            specialEasing: {
              top: 'easeOutBounce'
            },
            complete: function () {
              // Close all the three boxes in a regular interval.
              box1.delay(2000).queue(function (n) {
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_b"  style="width:30vw;">');
                if (ans == 1) kick.hide();
                n();
              });
              box2.delay(2500).queue(function (n) {
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_b" style="width:30vw;">');
                if (ans == 2) kick.hide();
                n();
              });
              box3.delay(3000).queue(function (n) {
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_b" style="width:30vw;">');
                if (ans == 3) kick.hide();
                soundFlip.play();

                var box_top = box3.position().top;

                box1.css({
                  position: "absolute",
                  top: box_top,
                  left: 0 + "vw"
                });

                box2.css({
                  position: "absolute",
                  top: box_top,
                  left: 33 + "vw"
                });

                box3.css({
                  position: "absolute",
                  top: box_top,
                  left: 66 + "vw"
                });

                shuffle = function (o) { //v1.0
                  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                  return o;
                };

                interval = setTimeout(gamepPlay, shuffleSpeed);
                n();
              });


            }
          });
        }
      });
    });






  })();


});

