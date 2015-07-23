$(document).ready(function generate_game_board() {

        var chalkboard = $('<div>').addClass('chalkboard col-sm-8 col-sm-offset-2');
        var game_main = $('<div>').addClass('game-main col-sm-8');
        var game = $('<div>').addClass('game col-sm-10 col-sm-offset-1');
        //var img = $('<img>').attr('src', 'images/bart.png')
        var title = $('<div>').addClass('title col-sm-12').text('Tic-Tac-Toe');

        var players_main = $('<div>').addClass('players-main col-sm-4')
        var player_container = $('<div>').addClass('players-container col-sm-8 col-sm-offset-2');
        var player1 = $('<div>').addClass('players col-sm-12').attr('id', 'player1').text('Player 1');
        var player2 = $('<div>').addClass('players col-sm-12').attr('id', 'player2').text('Player 2');
        var modal = $('<div>').addClass("modal fade").attr({
            id: 'myModal',
            role: "dialog"
        });
        var modal_dialog = $('<div>').addClass('modal-dialog');
        var modal_content = $('<div>').addClass('modal-content');
        var modal_header = $('<div>').addClass('modal-header');
        var h1 = $('<h1>').css('color', 'black').html('X is the winner!');
        var h2 = $('<h1>').css('color', 'black').html('O is the winner!');
        var h3 = $('<h1>').css('color', 'black').html('Looks like we have a tie!');
        var button = $('<button>').css('background', 'black').text('Try Again');
        var modal_body = $('<div>').addClass('modal-body');
        var img = $('<img>').attr('src', 'images/homer.jpg');
        var img2 = $('<img>').attr('src', 'images/bart_tie.png')

        $(modal_body).append(img);
        $(modal_header).append(h1, button);
        $(modal_content).append(modal_body, modal_header);
        $(modal_dialog).append(modal_content)
        $(modal).append(modal_dialog);

        $('body').append(chalkboard, modal);
        $(chalkboard).append(game_main, players_main);
        $(game_main).append(game);
        $(game).append(title)
        for (var i = 0; i < 9; i++) {

            var game_square = $('<div>').addClass('game-square col-sm-4').attr({
                id: 'square_number' + i,
                square_number: i
            });
            $(game).append(game_square);

        }
        $(player_container).append(player1, player2);
        $(players_main).append(player_container);

        $('button').on('click', game_reset);

        var turnCount = 0;
        var gb = ['', '', '', '', '', '', '', '', ''];
        var wc = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [2, 5, 8],
            [0, 3, 6],
            [0, 4, 8],
            [6, 4, 2]
        ];



        $('#player1').addClass('border');

        function game_reset() {
            if (turnCount % 2 != 0) {
                $('#player2').toggleClass('border');
            }

            turnCount = 0;
            $('body').html('');
            generate_game_board();
        }



        $('.game').find('.game-square').one('click', function() {
            if (turnCount % 2 === 0) {
                $(this).html('x');
                gb[$(this).attr('square_number')] = 'X';
                console.log(gb)
                $('#player1').toggleClass('border');
                $('#player2').addClass('border');

            } else {
                $(this).html('O');
                gb[$(this).attr('square_number')] = 'O';
                console.log(gb)
                $('#player2').toggleClass('border');
                $('#player1').addClass('border');
            }
            turnCount++;
            for (i = 0; i < wc.length; i++) {
                if (gb[wc[i][0]] == '' && gb[wc[i][1]] == '' && gb[wc[i][2]] == '') {
                    return;

                }
                console.log(gb[wc[i][0]] + '==' + gb[wc[i][1]] + '&&' + gb[wc[i][1]] + '==' + gb[wc[i][2]])
                if (gb[wc[i][0]] == gb[wc[i][1]] && gb[wc[i][1]] == gb[wc[i][2]]) {

                    if (gb[wc[i][0]] == 'O') {
                        $(h1).remove();
                        $(modal_header).append(h2);
                    }


                    $('#myModal').modal('show');
                    setTimeout(function(){
                    $('body').one('click', game_reset)
                }, 1000);
                    return;

                } else if (turnCount == 9 && gb[wc[i][0]] != gb[wc[i][1]] && gb[wc[i][1]] != gb[wc[i][2]]) {
                    $(img).remove();
                    $(h1).remove();
                    $(modal_body).append(img2);
                    $(modal_header).append(h3)
                    $('#myModal').modal('show');
                    setTimeout(function(){
                    $('body').one('click', game_reset)
                }, 1000);
                    return;
                }

            }


        });


    });