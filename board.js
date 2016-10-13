var gameBoard = {
    pieces: new Array(BRD_SQ_NUM),
    side: COLORS.WHITE,
    fiftyMove: 0,
    hisPly: 0,
    ply: 0,
    enPas: 0,
    castlePerm: 0,
    material: new Array(2), // W and B piece material
    pceNum: new Array(13),
    pList: new Array(14 * 10), //Piecelist
    posKey: 0
};

function generatePosKey() {

    var sq = 0,
        finalKey = 0,
        piece = PIECES.EMPTY;

    for (sq = 0; sq < BRD_SQ_NUM; sq++) {
        piece = gameBoard.pieces[sq];
        if (piece !== PIECES.EMPTY && piece !== SQUARES.OFFBOARD) {
            finalKey ^ ⁼pieceKeys[(piece * 120) + sq];
        }
    }

    if (gameBoard.side === COLORS.WHITE) {
        finalKey ^= sideKey;
    }

    if (gameBoard.enPas !== SQUARES.NO_SQ) {
        finalKey ^= pieceKeys[gameBoard.enPas];
    }

    return finalKey;
}