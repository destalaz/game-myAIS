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
      kickDropDownAnimationDelay = 1500,
      shuffleSpeed = 700,
      nuberOfShuffels = 10,
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
      amountWin = localStorage.setItem('amountWin', '3'),
      win = false;
    if (localStorage.getItem('countWin') === null) {
      console.log("this nullll");
      localStorage.setItem('countWin', '1');
    }
    // localStorage.setItem('countWin', '1');
    // console.log(localStorage.getItem('countWin'));

    setMessage("Game " + localStorage.getItem('countWin') + "of " + localStorage.getItem('amountWin'));


    function popupmix() {
      bodyPopup.show();
    }



    startButton.on("click", function startGame(event) {
      HeaderText.show();
      setMessage("Game " + localStorage.getItem('countWin') + "of " + localStorage.getItem('amountWin'));
      if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('amountWin'))) {
        localStorage.setItem('countWin', 1);
      }


      // win_now = parseInt(localStorage.getItem('countWin')) + parseInt(1);
      // countWinBefore = localStorage.setItem('win_now', '1');
      // console.log("winnn now", win_now);


      // popupmix();

      if (localStorage.getItem('amountWin') === "3") {
        cup1.css('display', 'inline');
        cup2.css('display', 'inline');
        cup3.css('display', 'inline');
        cup4.css('display', 'none');
        cup5.css('display', 'none');
      } else if (localStorage.getItem('amountWin') === "4") {
        cup1.css('display', 'inline');
        cup2.css('display', 'inline');
        cup3.css('display', 'inline');
        cup4.css('display', 'inline');
        cup5.css('display', 'none');
      } else if (localStorage.getItem('amountWin') === "5") {
        cup1.css('display', 'inline');
        cup2.css('display', 'inline');
        cup3.css('display', 'inline');
        cup4.css('display', 'inline');
        cup5.css('display', 'inline');
      }


      if (localStorage.getItem('countWin') === "1") {
        cup1.css('opacity', '1');
        cup2.css('opacity', '0.2');
        cup3.css('opacity', '0.2');
        cup4.css('opacity', '0.2');
        cup5.css('opacity', '0.2');
      } else if (localStorage.getItem('countWin') === "2") {
        console.log("cup win 2");
        cup1.css('opacity', '1');
        cup2.css('opacity', '1');
        cup3.css('opacity', '0.2');
        cup4.css('opacity', '0.2');
        cup5.css('opacity', '0.2');
      } else if (localStorage.getItem('countWin') === "3") {
        console.log("cup win 3");
        cup1.css('opacity', '1');
        cup2.css('opacity', '1');
        cup3.css('opacity', '1');
        cup4.css('opacity', '0.2');
        cup5.css('opacity', '0.2');
      } else if (localStorage.getItem('countWin') === "4") {
        console.log("cup win 4");
        cup1.css('opacity', '1');
        cup2.css('opacity', '1');
        cup3.css('opacity', '1');
        cup4.css('opacity', '1');
        cup5.css('opacity', '0.2');
      }
      else if (localStorage.getItem('countWin') === "5") {
        console.log("cup win 5");
        cup1.css('opacity', '1');
        cup2.css('opacity', '1');
        cup3.css('opacity', '1');
        cup4.css('opacity', '1');
        cup5.css('opacity', '1');
      }


      // count_win_cup();
      btnResume.click(function () {

        // bodyPopup.hide();
      });

      btnClose.click(function () {
        bodyPopup.hide();
      });

      divBtn.hide();
      HeaderText.hide();
      var ans = Math.floor(Math.random() * 3) + 1;
      var kickInitialPosition = 0;
      reset_position();
      console.log("this->script->recive parameter", localStorage.getItem('Mobile'));

      console.log("win is ", ans);
      // if (countWin === 4) {
      //   kick.hide();
      //   divBtn.show();
      //   HeaderText.html('<img src="../../assets/aunjaiAssets/component/for_score_ic@2x.png" id="box_o_t" style="width:30vw;">');
      //   HeaderText.show();
      //   HeaderText.animate({
      //     top: "10vh"
      //   }, {
      //     duration: 900,
      //     specialEasing: {
      //       top: 'easeInQuint'
      //     }
      //   });
      //   console.log("false");
      //   if (!win) {
      //     win = true;
      //     countWin = 1;
      //     setMessage("Game " + countWin + " of 3");
      //     return false;
      //   }

      // }
      divBtn.hide();
      ready_game();
      kick.show();



      // Update the initial position based on the answer
      kickInitialPosition = 30 + ((ans - 1) * 230);
      30 + ((ans - 1) * 240);
      if (ans === 1) {
        kickInitialPosition = box1.position().left;
      } else if (ans === 2) {
        kickInitialPosition = box2.position().left;
      } else {
        kickInitialPosition = box3.position().left;
      }
      console.log("kick init ", kickInitialPosition);
      // Move kick Under the relative box based on answer
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
          kick.html("<img src='../../../assets/aunjaiAssets/avatar/Cloth_Point_02@2x.png' style='width:28vw;' />");
          kick.animate({
            top: "52%"
          }, {
            duration: 500,
            specialEasing: {
              top: 'easeOutBounce'
            },
            complete: function () {


              // Close all the three boxes in a regular interval.
              box1.delay(3000).queue(function (n) {
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_b"  style="width:30vw;">');
                if (ans == 1) kick.hide();
                n();
              });
              box2.delay(4000).queue(function (n) {
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_b" style="width:30vw;">');
                if (ans == 2) kick.hide();
                n();
              });
              box3.delay(5000).queue(function (n) {
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_b" style="width:30vw;">');
                if (ans == 3) kick.hide();


                var box1_left = box1.position().left,
                  box2_left = box2.position().left,
                  box3_left = box3.position().left,
                  box_top = box3.position().top;

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

                var interval = setInterval(function () {
                  var array = shuffle([1, 2, 3]);

                  $("#box" + array[0]).animate({
                    left: $("#box" + array[1]).position().left + "px"
                  }, {
                    duration: shuffleSpeed / 2,
                    specialEasing: {
                      left: 'easeInQuint'
                    }
                  });

                  $("#box" + array[1]).animate({
                    left: $("#box" + array[0]).position().left + "px"
                  }, {
                    duration: shuffleSpeed / 2,
                    specialEasing: {
                      left: 'easeInQuint'
                    }
                  });


                }, shuffleSpeed);


                setTimeout(function () {
                  clearInterval(interval);
                  var flag = 0;
                  // setMessage("Click on the box, that you think Aunjai is hidden >> :p")

                  box1.click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="width:30vw;">');
                      box1.animate({
                        top: $(this).position().top + -24 + "vh"
                      });
                      if (ans == 1) {
                        flag = 1;
                        ans_position_left = box1.position().left;
                        slide_out();
                      } else {
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="width:30vw;">');
                        }, 1500);
                        flag = 1;
                        HeaderText.html('<img src="../../assets/aunjaiAssets/avatar/Aunjai_Cry@2x.png" id="box_o_t" style="width:40vw;">');
                        HeaderText.show();
                        HeaderText.animate({
                          top: "20vh"
                        }, {
                          duration: 900,
                          specialEasing: {
                            top: 'easeInQuint'
                          }
                        });
                        gameOver();
                      }
                    }
                  });

                  box2.click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="width:30vw;" >');
                      box2.animate({
                        top: $(this).position().top - 24 + "vh"
                      });
                      if (ans == 2) {
                        flag = 1;
                        ans_position_left = box2.position().left;
                        slide_out();
                      } else {
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" style="width:30vw;">');
                        }, 1500);
                        flag = 1;
                        HeaderText.html('<img src="../../assets/aunjaiAssets/avatar/Aunjai_Cry@2x.png" id="box_o_t" style="width:40vw;">');
                        HeaderText.show();
                        HeaderText.animate({
                          top: "20vh"
                        }, {
                          duration: 900,
                          specialEasing: {
                            top: 'easeInQuint'
                          }
                        });
                        gameOver();
                      }
                    }
                  });

                  $("#box3").click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t"  style="width:30vw;">');
                      box3.animate({
                        top: $(this).position().top + -24 + "vh"
                      });
                      if (ans == 3) {
                        flag = 1;
                        // ans_position_left = box3.position().left;
                        ans_position_left = box3.position().left;
                        slide_out();
                      } else {
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="width:30vw;">');
                        }, 1500);
                        flag = 1;
                        HeaderText.html('<img src="../../assets/aunjaiAssets/avatar/Aunjai_Cry@2x.png" id="box_o_t" style="width:40vw;">');
                        HeaderText.show();
                        HeaderText.animate({
                          top: "10vh"
                        }, {
                          duration: 900,
                          specialEasing: {
                            top: 'easeInQuint'
                          }
                        });

                        gameOver();
                      }
                    }
                  });


                  function slide_out() {
                    kick.css({ left: ans_position_left });
                    win = false;
                    kick.show();
                    kick.animate({
                      top: "56%",
                      left: ans_position_left
                    }, {
                      duration: 500,
                      specialEasing: {
                        top: 'easeInQuint'
                      }
                    });
                    HeaderText.show();
                    HeaderText.html('<img src="../../assets/aunjaiAssets/header/win_ic.svg" id="box_o_t"  style="width:40vw;">');
                    HeaderText.animate({
                      top: "8vh"
                    }, {
                      duration: 900,
                      specialEasing: {
                        top: 'easeInQuint'
                      }
                    });
                    setTimeout(() => {
                      // countWin = parseInt(countWin) + 1;
                      // if (countWin === 2) {
                      //   console.log("countWin 2");
                      //   shuffleSpeed = 500;
                      //   setMessage("Game " + countWin + " of 3");
                      // } else if (countWin === 3) {
                      //   console.log("countWin 3");
                      //   shuffleSpeed = 400;
                      //   setMessage("Game " + countWin + " of 3");
                      // } else if (countWin === 4) {
                      //   console.log("countWin 4");
                      //   setMessage("Game " + 3 + " of 3");
                      // }


                      setTimeout(() => {
                        win_now = parseInt(localStorage.getItem('countWin')) + parseInt(1);
                        localStorage.setItem('countWin', win_now);

                        if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('amountWin'))) {
                          localStorage.setItem('countWin', 1);
                        }

                        if (localStorage.getItem('countWin') === "1") {
                          btnResume1.show();
                        } else if (localStorage.getItem('countWin') === "2") {
                          btnResume2.show();
                        } else if (localStorage.getItem('countWin') === "3") {
                          btnResume3.show();
                        } else if (localStorage.getItem('countWin') === "4") {
                          btnResume4.show();
                        }
                        else if (localStorage.getItem('countWin') === "5") {
                          // btnResume5.show();
                        }
                        bodyPopup.show();
                      }, 2000);
                    }, 5000);

                  }


                  function gameOver() {
                    localStorage.setItem('countWin', '1');
                    win = false;
                    divBtn.show();
                    console.log("game Over");
                    // countWin = 1;
                    setMessage("Game " + localStorage.getItem('countWin') + " of 3");

                    setTimeout(() => {
                      bodyPopup.show();
                    }, 2000);
                  }


                }, nuberOfShuffels * shuffleSpeed);
                n();
              });


            }
          });
        }
      });
    });

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

      setTimeout(function () {

        setTimeout(function () {

          if (localStorage.getItem('countWin') === 1) {
            HeaderText.show();
            HeaderText.html('<img src="../../assets/aunjaiAssets/header/ready_ic.svg" id="box_o_t" style="width:70vw;">');
            

          } else if (localStorage.getItem('countWin') === 2) {
            cup1.css('opacity', '1');
            cup2.css('opacity', '1');
            cup3.css('opacity', '0.2');
            console.log("local2");
            HeaderText.show();
            HeaderText.html('<img src="../../assets/aunjaiAssets/header/game2_ic.svg" id="box_o_t" style="width:70vw;">');
           

          } else if (localStorage.getItem('countWin') === 3) {
            console.log("cup win 3");
            cup1.css('opacity', '1');
            cup2.css('opacity', '1');
            cup3.css('opacity', '1');
            console.log("local3");
            HeaderText.show();
            HeaderText.html('<img src="../../assets/aunjaiAssets/header/game3_ic.svg" id="box_o_t" style="width:70vw;">');
           
          }
        }, 1500);




        setTimeout(function () {
          HeaderText.show();
          HeaderText.html('<img src="../../assets/aunjaiAssets/component/random_bg.svg" id="box_o_t"  style="width:40vw;"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size:10vh;">3</div>');
        }, 2500);
        setTimeout(function () {
          HeaderText.html('<img src="../../assets/aunjaiAssets/component/random_bg.svg" id="box_o_t"style="width:40vw;"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size:10vh;">2</div>');

        }, 3500);
        setTimeout(function () {
          HeaderText.html('<img src="../../assets/aunjaiAssets/component/random_bg.svg" id="box_o_t" style="width:40vw;"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size:10vh;">1</div>');
        }, 4500);
        setTimeout(function () {
          HeaderText.hide();
        }, 5000);
      }, 1000);
    }

  })();


});