const createBattleShip = (positions, damage, bHasSunk) => {
    let length = positions.length;

    function hit(point) {
        if(damage.includes(point))
            return this;
        damage.push(point);
        return this;
    };

    function isSunk() {
        return length === damage.length
            && damage.every((x,index) => x === positions[index]);
    }

    return { positions, length, damage, bHasSunk, hit, isSunk };
};

const createGameboard = () => {
    let ships = [];
    let missedHits = [];
    let remainingShips = 0;
    let bHasShipsRemaining = false;
    
    function spawnBattleShip(coords) {
        const ship = createBattleShip(coords, [], false);
        ships.push(ship);
    }

    function receiveAttack(coords) {
        let shipsHit = ships.filter((x) => {
            let hits = coords.filter((y) => x.positions.includes(y));
            hits.forEach((h) => x.hit(h));
            
            return hits.length === 0;
        });

        if(shipsHit.length !== 0) missedHits.push(coords);
    }

    return { ships, missedHits, spawnBattleShip, receiveAttack};
};

module.exports = { createBattleShip, createGameboard };