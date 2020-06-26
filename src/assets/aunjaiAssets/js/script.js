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
      shuffleSpeed = 1000,
      nuberOfShuffels = 1,
      cup1 = $("#img-Round-cup1"),
      cup2 = $("#img-Round-cup2"),
      cup3 = $("#img-Round-cup3"),
      countWin = 1,
       data1 = localStorage.getItem('Mobile');



    startButton.on("click", function startGame(event) {
      var ans = Math.floor(Math.random() * 3) + 1;
      var kickInitialPosition = 0;
      reset_position();
      console.log("this->script->recive parameter", localStorage.getItem('Mobile'));
      console.log("this count wind", countWin);
      // clearPosition();
      divBtn.hide();
      ready_game();
      // HeaderText.hide();
      // event.preventDefault();

      //Show the character fist
      kick.show();


      // Update the initial position based on the answer
      kickInitialPosition = 30 + ((ans - 1) * 240);

      // Move kick Under the relative box based on answer
      kick.css({
        left: kickInitialPosition + "px"
      });

      // Droping kick from the top into the box.
      kick.animate({
        top: "690px"
      }, {
        duration: kickDropDownAnimationDelay,
        specialEasing: {
          top: 'easeOutBounce'
        },
        complete: function () {
          kick.html("<img src='../../../assets/aunjaiAssets/avatar/Cloth_Point_02@2x.png' width='200px' />");
          kick.animate({
            top: "580px"
          }, {
            duration: 500,
            specialEasing: {
              top: 'easeOutBounce'
            },
            complete: function () {
              // setMessage("Closing the boxes ;)")

              // Close all the three boxes in a regular interval.
              box1.delay(500).queue(function (n) {
                // $(this).animate({
                //   top: + 20 + "px"
                // });
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_b" alt="" width="240px">');
                if (ans == 1) kick.hide();
                n();
              });
              box2.delay(1000).queue(function (n) {
                // $(this).animate({
                //   top: + 20 + "px"
                // });
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_b" alt="" width="240px">');
                if (ans == 2) kick.hide();
                n();
              });
              box3.delay(1500).queue(function (n) {
                // $(this).animate({
                //   top: box2.position().top
                // });
                $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_b" alt="" width="240px">');
                if (ans == 3) kick.hide();


                var box1_left = box1.position().left,
                  box2_left = box2.position().left,
                  box3_left = box3.position().left,
                  box_top = box3.position().top;

                box1.css({
                  position: "absolute",
                  top: box_top,
                  left: box1_left + "px"
                });

                box2.css({
                  position: "absolute",
                  top: box_top,
                  left: box2_left + "px"
                });

                box3.css({
                  position: "absolute",
                  top: box_top,
                  left: box3_left + "px"
                });

                shuffle = function (o) { //v1.0
                  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                  return o;
                };

                var interval = setInterval(function () {

                  // setMessage("Game 1 of 3");



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
                  // $('div[id^="box"]').css("cursor", "pointer");
                  // setMessage("Click on the box, that you think Aunjai is hidden >> :p")

                  box1.click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" width="240px" >');
                      box1.animate({
                        top: $(this).position().top + -200 + "px"
                      });
                      if (ans == 1) {
                        kick.css({
                          left: $(this).position().left + 46 + "px"
                        });
                        flag = 1;
                        slide_out();
                      } else {
                        print_error();
                        flag = 1;
                        // clearPosition();
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" width="240px">');
                        }, 1500);
                      }
                    }
                  });

                  box2.click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" width="240px" >');
                      box2.animate({
                        top: $(this).position().top + -200 + "px"
                      });
                      if (ans == 2) {
                        kick.css({
                          left: $(this).position().left + 46 + "px"
                        });
                        flag = 1;
                        slide_out();
                      } else {
                        flag = 1;
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" width="240px">');
                        }, 1500);
                        // print_error();
                        // clearPosition();
                      }
                    }
                  });

                  $("#box3").click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" width="240px">');
                      box3.animate({
                        top: $(this).position().top + -200 + "px"
                      });
                      if (ans == 3) {
                        kick.css({
                          left: $(this).position().left + 46 + "px"
                        });
                        flag = 1;
                        slide_out();
                      } else {
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" alt="" width="240px">');
                        }, 1500);
                        flag = 1;
                        print_error();
                      }
                    }
                  });


                  function slide_out() {
                    kick.show();
                    kick.animate({
                      top: "750px"
                    }, {
                      duration: 500,
                      specialEasing: {
                        top: 'easeInQuint'
                      }
                    });
                    HeaderText.html('<img src="../../assets/aunjaiAssets/header/win_ic.svg" id="box_o_t" alt="" width="400px">');
                    HeaderText.show();
                    HeaderText.animate({
                      top: "200px"
                    }, {
                      duration: 900,
                      specialEasing: {
                        top: 'easeInQuint'
                      }
                    });
                    localStorage.setItem('Mobile', '800');
                    setTimeout(() => {
                      countWin = parseInt(countWin) + 1;
                      setMessage("Game " + countWin + " of 3");
                      startGame();
                    }, 5000);

                  }


                  function print_error() {
                    // setMessage("Nothing found.. :P :P <a href='index.html' >try again</a>", "color_1");
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
      box1.html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="transform: rotate(180deg); width:240px;">');
      box2.html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="transform: rotate(180deg); width:240px;">');
      box3.html('<img src="../../assets/aunjaiAssets/component/Group_2069.svg" id="box_o_t" style="transform: rotate(180deg); width:240px;">');
      kick.css({ top: '100px', left: '0px' });
      box1.css({ left: '0px', top: '660px', position: 'absolute' });
      box2.css({ left: '240px', top: '660px', position: 'absolute' });
      box3.css({ left: '480px', top: '660px', position: 'absolute' });
      count_win_cup();
    }
    function count_win_cup() {
      if (countWin === 1) {
        cup1.css('opacity', '1');
      }
      else if (countWin === 2) {
        cup1.css('opacity', '1');
        cup2.css('opacity', '1');
      } else {
        cup1.css('opacity', '1');
        cup2.css('opacity', '1');
        cup3.css('opacity', '1');
      }
    }

    function ready_game() {
      setTimeout(function () {
        HeaderText.html('<img src="../../assets/aunjaiAssets/component/random_bg.svg" id="box_o_t" alt="" width="400px"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size:70px;">3</div>');

        setTimeout(function () {
          HeaderText.html('<img src="../../assets/aunjaiAssets/component/random_bg.svg" id="box_o_t" alt="" width="400px"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size:70px;">2</div>');
        }, 1000);
        setTimeout(function () {
          HeaderText.html('<img src="../../assets/aunjaiAssets/component/random_bg.svg" id="box_o_t" alt="" width="400px"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size:70px;">1</div>');
        }, 2000);
        setTimeout(function () {
          HeaderText.hide();
        }, 2500);
      }, 1000);
    }

  })();


});