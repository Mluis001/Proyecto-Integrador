import { Piece } from './piece';
export class Board {
    pieces: any[];
    lastMove: any;
    turnToMove: string;
    timeWhite: number;
    timeBlack: number;
    capturedPiecesWhite = [];
    capturedPiecesBlack = [];
    whiteRookCaps: Piece[];
    whiteKnightCaps: Piece[];
    whiteBishopCaps: Piece[];
    whiteQueenCaps: Piece[];
    whiteKingCaps: Piece[];
    whitePawnCaps: Piece[];
    blackRookCaps: Piece[];
    blackKnightCaps: Piece[];
    blackBishopCaps: Piece[];
    blackQueenCaps: Piece[];
    blackKingCaps: Piece[];
    blackPawnCaps: Piece[];
    blackPiecesValue = 0;
    whitePiecesValue = 0;
    whiteOnCheck: Boolean;
    blackOnCheck: Boolean;
    history: any[];
    defaultPosition = [
        ['br', 'bh', 'bb', 'bq', 'bk', 'bb', 'bh', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wh', 'wb', 'wq', 'wk', 'wb', 'wh', 'wr']
    ];
castling = ['a8', 'a1', 'e1', 'e8', 'h8', 'h1']; }
