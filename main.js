$('document').ready(function() {
    init();
});

function initFilesRanksBrd() {

       var file = FILES.FILE_A,
        rank = RANKS.RANK_1,
        sq = SQUARES.A1;

    // Set the board to offboard first
    for (var i = 0; i < BRD_SQ_NUM; i++) {
        filesBrd[i] = SQUARES.OFFBOARD;
        ranksBrd[i] = SQUARES.OFFBOARD;
    }

    for (rank = RANKS.RANK_1; rank <= RANKS.RANK_8; rank++) {
        for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            sq = filesRank2Square(file, rank);
            filesBrd[sq] = file;
            ranksBrd[sq] = rank;
        }
    }
}

function initHashKeys() {

	for(var i = 0; i < 14 * 120; i++) {
		pieceKeys[i] = rand32();
	}

	sideKey = rand32();

	for(var i = 0; i < 16; i++) {
		casleKey[i] = rand32();
	}
	 
}

function init() {
    initFilesRanksBrd();
    initHashKeys();

    //GUI
    var board,
        game = new Chess(),
        statusEl = $('#status'),
        fenEl = $('#fen'),
        pgnEl = $('#pgn');

    // do not pick up pieces if the game is over
    // only pick up pieces for the side to move
    var onDragStart = function(source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDrop = function(source, target) {
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';

        updateStatus();
    };

    // update the board position after the piece snap 
    // for castling, en passant, pawn promotion
    var onSnapEnd = function() {
        board.position(game.fen());
    };

    var updateStatus = function() {
        var status = '';

        var moveColor = 'White';
        if (game.turn() === 'b') {
            moveColor = 'Black';
        }

        // checkmate?
        if (game.in_checkmate() === true) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }

        // draw?
        else if (game.in_draw() === true) {
            status = 'Game over, drawn position';
        }

        // game still on
        else {
            status = moveColor + ' to move';

            // check?
            if (game.in_check() === true) {
                status += ', ' + moveColor + ' is in check';
            }
        }

        statusEl.html(status);
        fenEl.html(game.fen());
        pgnEl.html(game.pgn());
    };

    var cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    board = ChessBoard('board', cfg);

    updateStatus();

}