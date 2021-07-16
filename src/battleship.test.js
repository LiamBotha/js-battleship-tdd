const battleship = require('./battleship.js');

test('Create a battleship from factory', () => {
    const ship = battleship.createBattleShip([1, 2], [1], false);
    expect({ length: ship.length, damage: ship.damage, bHasSunk: ship.bHasSunk})
    .toEqual({
        length: 2,
        damage: [1],
        bHasSunk: false,
    })
});

test('Create a long battleship from factory', () => {
    const ship = battleship.createBattleShip([0,1,2,3], [1,3], false);
    expect({ length: ship.length, damage: ship.damage, bHasSunk: ship.bHasSunk})
    .toEqual({
        length: 4,
        damage: [1,3],
        bHasSunk: false,
    })
});

test('Battleship got hit', () => {
    const ship = battleship.createBattleShip([2,4,5], [], false).hit(2);
    expect({ length: ship.length, damage: ship.damage, bHasSunk: ship.bHasSunk})
    .toEqual({
        length: 3,
        damage: [2],
        bHasSunk: false,
    })
});

test('Battleship got hit 2', () => {
    const ship = battleship.createBattleShip([1,2,4,5,6], [1], false)
        .hit(2)
        .hit(5);
    expect({ length: ship.length, damage: ship.damage, bHasSunk: ship.bHasSunk})
    .toEqual({
        length: 5,
        damage: [1,2,5],
        bHasSunk: false,
    })
});

test('Battleship downed', () => {
    const ship = battleship.createBattleShip([1,2,3], [1,2,3], false);
    expect(ship.isSunk()).toBe(true);
});

test('Spawn ship from board', () => {
    const board = battleship.createGameboard();
    board.spawnBattleShip([1, 2, 3]);
    board.spawnBattleShip([6, 7, 8, 10]);
    expect(board.ships[0].positions).toEqual([1, 2, 3]);
    expect(board.ships[1].positions).toEqual([6, 7, 8, 10]);
});

test('Attack Ship from board', () => {
    const board = battleship.createGameboard();
    board.spawnBattleShip([1,2,3]);
    board.spawnBattleShip([6, 7, 8, 10]);
    board.receiveAttack([1, 5, 10]);
    expect(board.ships[0].damage).toEqual([1]);
    expect(board.ships[1].damage).toEqual([10]);
});

test('Missed Ship from board', () => {
    const board = battleship.createGameboard();
    board.spawnBattleShip([1,2,3]);
    board.spawnBattleShip([6, 7, 8, 10]);
    board.receiveAttack([4, 5]);
    expect(board.missedHits).toEqual([[4,5]]);
});