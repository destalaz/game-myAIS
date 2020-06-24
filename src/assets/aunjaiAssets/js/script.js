$(document).ready(function () {
  (function () {
    var box1 = $("#box1"),
      divBtn = $("#divBtn"),
      box2 = $("#box2"),
      box3 = $("#box3"),
      kick = $("#kick_jump"),
      cup_a = $("#box_o_t"),
      cup_b = $("#box_o_b"),
      HeaderText = $("#heading-Text"),
      startButton = $("#start_game"),
      messageRound = $("#msg_bd"),
      kickDropDownAnimationDelay = 1500,
      shuffleSpeed = 400,
      nuberOfShuffels = 1,
      z = 0,
      countWin = 0;

    var ans = Math.floor(Math.random() * 3) + 1;

    startButton.on("click", function startGame(event) {
      // clearPosition();
      divBtn.hide();
      HeaderText.hide();
      // event.preventDefault();
      var kickInitialPosition = 0;
      //Show the character fist
      kick.show();
      // Show the message "Starting the game"
      setMessage("Game " + parseInt(countWin + 1) + " of 3");
      // Update the initial position based on the answer
      kickInitialPosition = 30 + ((ans - 1) * 240);

      // Move kick Under the relative box based on answer
      kick.css({
        left: kickInitialPosition + "px"
      });

      // Droping kick from the top into the box.
      kick.animate({
        top: "880px"
      }, {
        duration: kickDropDownAnimationDelay,
        specialEasing: {
          top: 'easeOutBounce'
        },
        complete: function () {
          kick.html("<img src='../../assets/aunjaiAssets/avatar/Cloth_Point_02@2x.png' width='200px' />");
          kick.animate({
            top: "780px"
          }, {
            duration: 500,
            specialEasing: {
              top: 'easeOutBounce'
            },
            complete: function () {
              // setMessage("Closing the boxes ;)")

              // Close all the three boxes in a regular interval.
              box1.delay(500).queue(function (n) {
                $(this).animate({
                  top: + 20 + "px"
                });
                if (ans == 1) kick.hide();
                n();
              });
              box2.delay(1000).queue(function (n) {
                $(this).animate({
                  top: + 20 + "px"
                });
                if (ans == 2) kick.hide();
                n();
              });
              box3.delay(1500).queue(function (n) {
                $(this).animate({
                  top: box2.position().top
                });
                if (ans == 3) kick.hide();


                var box1_left = box1.position().left,
                  box2_left = box2.position().left,
                  box3_left = box3.position().left,
                  box_top = box3.position().top + 20 + "px";

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
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group 2070.svg" id="box_o_t" alt="" width="240px">');
                      box1.animate({
                        top: $(this).position().top + -200 + "px"
                      });

                      if (ans == 1) {
                        kick.css({
                          left: $(this).position().left + 46 + "px"
                        });
                        countWin = countWin + 1;
                        flag = 1;
                        slide_out();
                      } else {
                        print_error();
                        flag = 1;
                        // clearPosition();
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group 2069.svg" id="box_o_t" alt="" width="240px">');
                          box1.animate({
                            top: $(this).position().top + +200 + "px"
                          });
                        }, 1500);
                      }
                    }
                  });

                  box2.click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group 2070.svg" id="box_o_t" alt="" width="240px">');
                      box2.animate({
                        top: $(this).position().top + -200 + "px"
                      });
                      if (ans == 2) {
                        kick.css({
                          left: $(this).position().left + 46 + "px"
                        });
                        countWin = countWin + 1;
                        flag = 1;
                        slide_out();
                      } else {
                        flag = 1;
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group 2069.svg" id="box_o_t" alt="" width="240px">');
                          box2.animate({
                            top: $(this).position().top + +200 + "px"
                          });
                        }, 1500);
                        // print_error();
                        // clearPosition();
                      }
                    }
                  });

                  $("#box3").click(function () {
                    if (flag == 0) {
                      $(this).html('<img src="../../assets/aunjaiAssets/component/Group 2070.svg" id="box_o_t" alt="" width="240px">');
                      box3.animate({
                        top: $(this).position().top + -200 + "px"
                      });
                      if (ans == 3) {
                        kick.css({
                          left: $(this).position().left + 46 + "px"
                        });
                        countWin = countWin + 1;
                        flag = 1;
                        slide_out();
                      } else {
                        setTimeout(() => {
                          $(this).html('<img src="../../assets/aunjaiAssets/component/Group 2069.svg" id="box_o_t" alt="" width="240px">');
                          box3.animate({
                            top: $(this).position().top + +200 + "px"
                          });
                        }, 1500);
                        flag = 1;
                        print_error();
                      }
                    }
                  });


                  function slide_out() {
                    // setMessage("Congrats You won hard mode!!!! <a href='index.html' >Play again</a>", "color_2");
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
                      duration: 500,
                      specialEasing: {
                        top: 'easeInQuint'
                      }
                    });

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

  })();


});