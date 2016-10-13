"use strict";

const PIECES = {
        EMPTY: 0,
        wP: 1,
        wN: 2,
        wB: 3,
        wR: 4,
        wQ: 5,
        wK: 6,
        bP: 7,
        bN: 8,
        bB: 9,
        bR: 10,
        bQ: 11,
        bK: 12
    },

    BRD_SQ_NUM = 120,

    FILES = {
        FILE_A: 0,
        FILE_B: 1,
        FILE_C: 2,
        FILE_D: 3,
        FILE_E: 4,
        FILE_F: 5,
        FILE_G: 6,
        FILE_H: 7,
        FILE_NONE: 8,
    },

    RANKS = {
        RANK_1: 0,
        RANK_2: 1,
        RANK_3: 2,
        RANK_4: 3,
        RANK_5: 4,
        RANK_6: 5,
        RANK_7: 6,
        RANK_8: 7,
        RANK_NONE: 8
    },

    COLORS = {
        WHITE: 0,
        BLACK: 1,
        BOTH: 2
    },

    CASTLEBIT = {
        WKCA: 1,
        WQCA: 2,
        BKCA: 4,
        BQCA: 8
    },

    SQUARES = {
        A1: 21,
        B1: 22,
        C1: 23,
        D1: 24,
        E1: 25,
        F1: 26,
        G1: 27,
        H1: 28,
        A8: 91,
        B8: 92,
        C8: 93,
        D8: 94,
        E8: 95,
        F8: 96,
        G8: 97,
        H8: 98,
        NO_SQ: 99,
        OFFBOARD: 100
    },

    BOOL = {
        FALSE: 0,
        TRUE: 1
    },

    filesBrd = new Array(BRD_SQ_NUM),
    ranksBrd = new Array(BRD_SQ_NUM);

function filesRank2Square(f, r) {
    return ((21 + (f) + (r) * 10));
}

var PieceBig = [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    PieceMaj = [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    PieceMin = [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    PieceVal = [0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000],
    PieceCol = [COLORS.BOTH, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE, COLORS.WHITE,
        COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK, COLORS.BLACK
    ],

    PiecePawn = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    PieceKnight = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    PieceKing = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    PieceRookQueen = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    PieceBishopQueen = [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    PieceSlides = [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],

    pieceKeys = new Array(14 * 120),
    sideKey,
    castleKey = new Array(16);

    function rand32() {
    	return (Math.floor((Math.random()*255)+1) << 23) | (Math.floor((Math.random()*255)+1) << 16)
    		| (Math.floor((Math.random()*255)+1) << 8) | Math.floor((Math.random()*255)+1)
    }
