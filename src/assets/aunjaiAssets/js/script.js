// window.addEventListener("storage", function (e) {
//     localStorage.clear();
//     if (e.storageArea === sessionStorage) {
//         sessionStorage.clear();
//     }
// // }, true);

// function detectDevTool(allow) {
//     if (isNaN(+allow)) allow = 100;
//     var start = +new Date();
//     debugger;
//     var end = +new Date();
//     if (isNaN(start) || isNaN(end) || end - start > allow) {
//         alert('debug detected. all operations will be terminated.');
//         document.write('debug detected.');
//     }
// }
var wathch = setInterval(function () { detectDevTool() }, 1000);

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
            chkgameFirst = false,
            kickDropDownAnimationDelay = 1200,
            btnResume = $("#btn_resume"),
            bodyPopup = $("#body-popup"),
            cup1 = $("#img-Round-cup1"),
            cup2 = $("#img-Round-cup2"),
            cup3 = $("#img-Round-cup3"),
            cup4 = $("#img-Round-cup4"),
            cup5 = $("#img-Round-cup5"),
            roundIMG = $("#heading-Round"),
            btnResume1 = $("#btn_resume1"),
            btnResume2 = $("#btn_resume2"),
            btnResume3 = $("#btn_resume3"),
            btnResume4 = $("#btn_resume4"),
            btnResume5 = $("#btn_resume5"),
            chkStartGame = false,
            counNumnOfShuffels = 0,
            resumBtn = $("#btnResumeGame"),
            pauseStatus = false,
            cclick, secure, ans,
            chksoundFlip = false,
            chkPauseFnGame = false,
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            playId = sessionStorage.getItem('playId'),
            click = false,
            chkpopupPause = false,
            countRound = 0,
            totolCountRound = 3,
            countRoundStop = 0,
            flag = 0,
            totolCountRoundStop = 5,
            shuffle,
            shuffleSpeedLeft, shuffleSpeedTop;

        if (localStorage.getItem('sumcclick') === null) {
            localStorage.setItem('sumcclick', "");
        }

        if (localStorage.getItem('countWin') === null) {
            localStorage.setItem('countWin', "1");
        }

        function configdecode(flip, tokenstr) {
            var result = [];
            flip = parseInt(flip);
            result.amt = tokenstr.substring(3 + flip, 3 + flip + parseInt(tokenstr[2 + flip]));
            result.speed = tokenstr.substring(10 + flip, 10 + flip + parseInt(tokenstr[9 + flip])).replace(/E/g, "0").replace("Y", "0");
            return result;
        }


        var data = JSON.parse(localStorage.getItem('config'));
        var index = parseInt(localStorage.getItem('countWin')) - 1;
        var entoken = configdecode(data[index].o, data[index].hash);


        soundGame = new Howl({
            src: ['../../../../rewardflip/assets/aunjaiAssets/sound/MSTR_-_MSTR_-_Choro_bavario_Loop.ogg.mp3'],
            loop: true,
            volume: 0.05,
        });

        var soundFlip = new Howl({
            src: ['../../../../rewardflip/assets/aunjaiAssets/sound/LONGTUNE.mp3'],
            loop: true,
            volume: 0.2,
        });
        var soundLose = new Howl({
            src: ['../../../../rewardflip/assets/aunjaiAssets/sound/HORNNOTS.mp3'],
            volume: 0.2,
        });
        var soundWin = new Howl({
            src: ['../../../../rewardflip/assets/aunjaiAssets/sound/XYLO0.mp3'],
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
            $('#win-img').html('<img src="../../../../rewardflip/assets/aunjaiAssets/header/win_ic.png" style="width:66vw;">').fadeIn();
            chkStartGame = false;
            chkpopupPause = false;
            kick.css({ left: ans_position_left });
            win = false;
            kick.show();
            kick.animate({
                top: "66%",
                left: ans_position_left
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
                        var resultGameWin = $("#resultGameWin");
                        resultGameWin.click();
                    } else {
                        btnResume3.show();
                        bodyPopup.show();
                    }
                } else if (localStorage.getItem('countWin') === "4") {
                    if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
                        var resultGameWin = $("#resultGameWin");
                        resultGameWin.click();
                    } else {
                        btnResume4.show();
                        bodyPopup.show();
                    }
                }
                else if (localStorage.getItem('countWin') === "5") {
                    if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
                        var resultGameWin = $("#resultGameWin");
                        resultGameWin.click();
                    } else {
                        btnResume5.show();
                        bodyPopup.show();
                    }
                }
                else if (localStorage.getItem('countWin') === "6") {
                    if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
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
            chkStartGame = false;
            chksoundFlip = false;
            chkpopupPause = false;
            localStorage.setItem('resumeGame', true);
            var resultGameWin = $("#resultGameWin");
            resultGameWin.click();
            localStorage.setItem('countWin', '1');
            localStorage.setItem('gameOver', "true");
        }

        function text_round() {
            setMessage("Game" + "&nbsp;" + localStorage.getItem('countWin') + "&nbsp;" + "of" + "&nbsp;" + localStorage.getItem('totalRound'));
        }

        function setMessage(message) {
            messageRound.html(message);
        }

        function reset_position() {
            box1.html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_t" style="transform: rotate(180deg); width:30vw;">');
            box2.html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_t" style="transform: rotate(180deg); width:30vw;">');
            box3.html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_t" style="transform: rotate(180deg); width:30vw;">');
            kick.css({ top: '0px', left: '0px' });
            box1.css({ left: '0vw', top: '0px', position: 'absolute' });
            box2.css({ left: '33vw', top: '0px', position: 'absolute' });
            box3.css({ left: '66vw', top: '0px', position: 'absolute' });

        }

        function check_round_img() {
            if (localStorage.getItem('countWin') === "1") {
                console.log("1");
                $("#heading-Round").html('<img src="../../../../rewardflip/assets/aunjaiAssets/header/ready_ic@2x.png" style="width:76vw;">');
            } else if (localStorage.getItem('countWin') === "2") {
                console.log("2");
                $("#heading-Round").html('<img src="../../../../rewardflip/assets/aunjaiAssets/header/game2_ic@2x.png" style="width:76vw;">');
            } else if (localStorage.getItem('countWin') === "3") {
                console.log("3");
                $("#heading-Round").html('<img src="../../../../rewardflip/assets/aunjaiAssets/header/game3_ic@2x.png" style="width:76vw;">');
            } else if (localStorage.getItem('countWin') === "4") {
                console.log("3");
                $("#heading-Round").html('<img src="../../../../rewardflip/assets/aunjaiAssets/header/game4_ic.png" style="width:76vw;">');
            } else if (localStorage.getItem('countWin') === "5") {
                console.log("5");
                $("#heading-Round").html('<img src="../../../../rewardflip/assets/aunjaiAssets/header/game5_ic.png" style="width:76vw;">');
            }
        }

        change_cup();
        text_round();
        check_round_img();
        startButton.on("click", function startGame(event) {
            chkStartGame = true;
            Howler.stop();
            roundIMG.hide();
            soundGame.stop();
            soundGame.play();
            HeaderText.hide();
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    Howler.mute(true);
                    chkPauseFnGame = true;
                    pause_fn();
                } else {
                    Howler.mute(false);
                    if (chkStartGame) {
                        if (chkPauseFnGame) {
                            if (pauseStatus === false) {
                                // console.log("pause");

                                chkgameFirst = true;
                                $("#body-popup-puse").show();
                                pauseStatus = true;
                            }
                        }
                    }

                }
            }, false);

            function pause_fn() {
                if (chkpopupPause === true) {
                    soundFlip.stop();
                    if (chkPauseFnGame) {

                        if (chksoundFlip) {
                            soundFlip.stop();
                            chkStatusflip = false;
                        }
                    }
                }

            };

            resumBtn.click(function () {
                $("#body-popup-puse").hide();
                $("#heading-Round").hide();
                chkgameFirst = false;
                setTimeout(() => {

                    // console.log("Resume");
                    if (chksoundFlip) {
                        soundFlip.stop();
                        soundFlip.play();
                    }
                    if (counNumnOfShuffels > 0) {
                        if (counNumnOfShuffels < nuberOfShuffels) {
                            soundFlip.stop();
                            soundFlip.play();
                            gamepPlay();
                        }
                    }

                    if (totolCountRound > countRound) {
                        roundStart();
                    }

                    if (countRoundStop > 0) {
                        roundStop();
                    }

                    pauseStatus = false;
                }, 1000);
            });

            //start   round 
            function roundStart() {
                countRound++;
                // console.log("Round Start", countRound);
                // console.log("totaocoundRound",totolCountRound);
                if (countRound == 1) {
                    $('#heading-Text').fadeIn();
                    $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/random_bg@2x.png" id="box_o_t"   style="width:64vw;"><div style="position: absolute;font-size:20vw; font-style:italic;">3</div>');
                    $('#heading-Text').fadeOut();
                } else if (countRound == 2) {
                    // console.log("If 2");
                    $('#heading-Text').fadeIn();
                    $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/random_bg@2x.png" id="box_o_t"   style="width:64vw;"><div style="position: absolute;font-size:20vw; font-style:italic;">2</div>');
                    $('#heading-Text').fadeOut();
                } else if (countRound == 3) {
                    // console.log("If 3");
                    $('#heading-Text').fadeIn();
                    $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/random_bg@2x.png" id="box_o_t"   style="width:64vw;"><div style="position: absolute;font-size:20vw; font-style:italic;">1</div>');
                    $('#heading-Text').fadeOut();
                } $('#heading-Text').animate({
                    fadeIn: (1000),
                }, {
                    duration: 1000, complete: function () {
                        // console.log("Round Start", countRound);
                        // console.log("totaocoundRound", totolCountRound);
                        if (totolCountRound > countRound) {
                            if (!pauseStatus) {
                                roundStart();
                            }
                        }
                        else {
                            $('#heading-Text').hide();
                            gamepPlay();
                        }
                    }
                });
            }
            ////finished round start



            //roundStop-count Start
            function roundStop() {
                chkStartGame = false;
                chkpopupPause = false;
                setTimeout(() => {
                    if (!click) {
                        // console.log("5");
                        $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/random_number/5.png" id="box_o_t"  style="width:28vw;">').fadeIn().fadeOut();
                    } else {
                        chk_Choose_click();
                    }
                    setTimeout(() => {
                        if (!click) {
                            // console.log("4");
                            $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/random_number/4.png" id="box_o_t"  style="width:28vw;">').fadeIn().fadeOut();
                        } else {
                            chk_Choose_click();
                        }
                    }, 1000);
                    setTimeout(() => {
                        if (!click) {
                            // console.log("3");
                            $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/random_number/3.png" id="box_o_t"  style="width:28vw;">').fadeIn().fadeOut();
                        } else {
                            chk_Choose_click();
                        }
                    }, 2000);
                    setTimeout(() => {
                        if (!click) {
                            // console.log("2");
                            $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/random_number/2.png" id="box_o_t"  style="width:28vw;">').fadeIn().fadeOut();
                        } else {
                            chk_Choose_click();
                        }
                    }, 3000);
                    setTimeout(() => {
                        if (!click) {
                            // console.log("1");
                            $('#heading-Text').html('<img src="../../../../rewardflip/assets/aunjaiAssets/random_number/1.png" id="box_o_t"  style="width:28vw;">').fadeIn().fadeOut();
                        } else {
                            chk_Choose_click();
                        }
                    }, 4000);
                    setTimeout(() => {
                        flag = "ewfwefwef";
                    }, 5000);

                    setTimeout(() => {
                        $('#heading-Text').hide();
                        // console.log("gameover");
                        flag = 1;
                        chk_Choose_click();
                    }, 6000);
                }, 1000);
            }
            function chk_Choose_click() {
                if (!click) {
                    gameOver();
                }
            }

            //start shuffle
            function gamepPlay() {
                chkpopupPause = true;
                counNumnOfShuffels++;
                // console.log("round",counNumnOfShuffels);
                if (chkgameFirst) {
                    nuberOfShuffels++;
                    // console.log("total round",nuberOfShuffels);
                    return;
                }
                if (chksoundFlip === false) {
                    if (counNumnOfShuffels == 1) {
                        // console.log("soundd start");
                        soundFlip.stop();
                        soundFlip.play();
                        if (pauseStatus === true) {
                            // console.log("sound pause");
                            soundFlip.stop();
                        }
                        chksoundFlip = true;
                        chkStatusflip = true;
                    }
                }
                // console.log("Shuffle Round", counNumnOfShuffels, "/", nuberOfShuffels);
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
                            if (!pauseStatus) {
                                gamepPlay();
                            }

                        } else {
                            chkStartGame = false;
                            chkpopupPause = false;
                            chksoundFlip = false;
                            soundFlip.stop();
                            roundStop();
                            box1.click(function () {
                                if (flag == 0) {
                                    click = true;
                                    $(this).html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2070@2xmin.png" id="box_o_t" style="width:30vw;">');
                                    box1.animate({ top: '-25vw' });
                                    if (ans == 1) {
                                        flag = 1;
                                        change_cup();
                                        HeaderText.hide();
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
                                    $(this).html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2070@2xmin.png" id="box_o_t" style="width:30vw;" >');
                                    box2.animate({ top: '-25vw' });
                                    if (ans == 2) {
                                        flag = 1;
                                        change_cup();
                                        HeaderText.hide();
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
                                    $(this).html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2070@2xmin.png" id="box_o_t"  style="width:30vw;">');
                                    box3.animate({ top: '-25vw' });
                                    if (ans == 3) {
                                        change_cup();
                                        flag = 1;
                                        HeaderText.hide();
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
                        }
                    },
                })
            }

            var nuberOfShuffels = entoken.amt;
            var shuffleSpeed = entoken.speed;
            shuffleSpeed = 40 + (shuffleSpeed / 2);
            shuffleSpeedTop = shuffleSpeed / 5;
            shuffleSpeedLeft = shuffleSpeed / 2;


            if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
                localStorage.setItem('countWin', 1);
            }

            btnResume.click(function () {
                bodyPopup.hide();
            });

            divBtn.hide();
            secure = playId.substr(playId.length - 8);
            countwin = parseInt(localStorage.getItem('countWin') - 1);
            ans = (parseInt(secure.charAt(countwin)) % 3) + 1;
            var kickInitialPosition = 0;
            reset_position();
            kick.show();
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
                top: "60%"
            }, {
                duration: kickDropDownAnimationDelay,
                specialEasing: {
                    top: 'easeOutBounce'
                },
                complete: function () {
                    kick.html("<img src='../../../../rewardflip/assets/aunjaiAssets/avatar/min/Cloth_Point_02@2x-min.png' style='width:28vw;' />");
                    kick.animate({
                        top: "62%"
                    }, {
                        duration: 500,
                        specialEasing: {
                            top: 'easeOutBounce'
                        },
                        complete: function () {
                            // Close all the three boxes in a regular interval.
                            box1.delay(1000).queue(function (n) {
                                $(this).html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_b"  style="width:30vw;">');
                                if (ans == 1) kick.hide();
                                n();
                            });
                            box2.delay(1500).queue(function (n) {
                                $(this).html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_b" style="width:30vw;">');
                                if (ans == 2) kick.hide();
                                n();
                            });
                            box3.delay(2000).queue(function (n) {
                                $(this).html('<img src="../../../../rewardflip/assets/aunjaiAssets/component/Group_2069@2x-min.png" id="box_o_b" style="width:30vw;">');
                                kick.hide();
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

                                interval = setTimeout(roundStart, gamepPlay, shuffleSpeed, roundStop);
                                n();
                            });
                        }
                    });
                }
            });
        });
    })();
});