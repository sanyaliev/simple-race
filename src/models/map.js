'use strict';

cc.Map = cc.Node.extend({
    ctor: function (space, type, size) {
        this._super();

        this.space = space;
        this.mapType = type;
        this.mapSize = size;
        this.minStep = 15;
        this.maxDeadlocks = 5;

        this.createBackground();
        this.createMap();
    },
    createBackground: function() {
        var mapPoint = this.getBoundingBox(),
            backgroundSize = this.mapSize * 1.5;

        mapPoint.x = mapPoint.x - (384 * (backgroundSize - 1) / 2);
        mapPoint.y = mapPoint.y + (384 * (backgroundSize - 1) / 2);

        for (var i = 0; i <= backgroundSize - 1; i++) {
            for (var j = 0; j <= backgroundSize - 1; j++) {
                var tile = new cc.TileMap(this.mapType, 'background'),
                    size = tile.getContentSize();

                tile.setPosition({
                    x: mapPoint.x + (size.width * j),
                    y: mapPoint.y + (size.height * -i)
                });

                this.addChild(tile, 0);
            }
        }
    },
    createMap: function() {
        var mapPoint = this.getBoundingBox();

        this.tiles = [];
        this.path = this.generateMapTiles();

        mapPoint.y = mapPoint.y + (384 * (this.mapSize - 1) / 2);
        mapPoint.x = mapPoint.x - (384 * (this.mapSize - 1) / 2);

        this.path.forEach(function(point, i) {
            var tile = this.getTileByDirection(point.d),
                size = tile.getContentSize();

            if (point.start) {
                tile.setTag("start-point");
                tile.finishPoint = point.finishPoint;
            }

            tile.order = point.order;
            tile.rotateAngle = point.a;

            tile.setPosition({
                y: mapPoint.y + (size.height * -point.y),
                x: mapPoint.x + (size.width * point.x)
            });

            this.addChild(tile, 1);
            this.tiles.push(tile);
        }, this);
    },
    generateMapTiles: function() {
        for (var i = 0;; i++) {
            var tiles = [],
                path = [],
                success = false,
                startPoint = {
                    y: this.getRandomInt(1, this.mapSize - 2),
                    x: this.getRandomInt(1, this.mapSize - 2),
                    a: 0, pa: 0, ta: 0, d: ''
                };

            for (var y = 0; y <= this.mapSize - 1; y++) {
                if (tiles[y] == undefined) {
                    tiles[y] = [];
                }

                for (var x = 0; x <= this.mapSize - 1; x++) {
                    tiles[y].push('');
                }
            }

            var step = 1, deadlocks = 0, currentPoint = startPoint;

            tiles[currentPoint.y][currentPoint.x] = 0;

            path.push(currentPoint);

            for (var j = 0;; j++) {
                var nextPoint = this.getNextPoint(tiles, startPoint, currentPoint, step);

                if (!nextPoint) {
                    break;
                }

                var rotate = this.getRotateAngle(nextPoint.a, path[path.length - 1].a);

                path[path.length - 1].a -= rotate;
                path[path.length - 1].ta += rotate * 2;

                if (path[path.length - 1].a < 0) {
                    path[path.length - 1].a += 360;
                }

                if (path[path.length - 1].ta < 0) {
                    path[path.length - 1].ta += 360;
                }

                if (path[path.length - 1].ta == 360) {
                    path[path.length - 1].ta = 0;
                }
    
                if (startPoint.x == nextPoint.x && startPoint.y == nextPoint.y) {
                    if (step >= this.minStep) {
                        path[0].a = this.getJoinAngle(path[path.length - 1], path[1]);
 
                        success = true;
                        break;
                    }

                    path[path.length - 1].a = path[path.length - 1].pa;

                    if (deadlocks >= this.maxDeadlocks) {
                        break;
                    }

                    deadlocks++;

                    continue;
                }

                tiles[nextPoint.y][nextPoint.x] = step++;

                currentPoint = nextPoint;
                path.push(nextPoint);
            }

            if (success && this.setupStartPoint(path)) {
                return path;
            }
        }
    },
    getJoinAngle: function(p1, p2) {
        var angle = 0;

        if (p1.ta == p2.pa) {
            angle = p2.pa;
        } else if (p1.ta == 0) {
            if (p2.pa == 90) {
                angle = 315;
            } else if (p2.pa == 270) {
                angle = 45;
            }
        } else if (p1.ta == 90) {
            if (p2.pa == 0) {
                angle = 135;
            } else if (p2.pa == 180) {
                angle = 45;
            }
        } else if (p1.ta == 180) {
            if (p2.pa == 90) {
                angle = 225;
            } else if (p2.pa == 270) {
                angle = 135;
            }
        } else if (p1.ta == 270) {
            if (p2.pa == 0) {
                angle = 225;
            } else if (p2.pa == 180) {
                angle = 315;
            }
        }

        return angle;
    },
    getRotateAngle: function(a, pa) {
        var angle = 0;

        if (a == pa) {
            return angle;
        }

        if (a == 0) {
            if (pa == 270) {
                angle = 45;
            } else if (pa == 90) {
                angle = -45;
            }
        } else if (a == 90) {
            if (pa == 0) {
                angle = 45;
            } else if (pa == 180) {
                angle = -45;
            }
        } else if (a == 180) {
            if (pa == 90) {
                angle = 45;
            } else if (pa == 270) {
                angle = -45;
            }
        } else if (a == 270) {
            if (pa == 180) {
                angle = 45;
            } else if (pa == 0) {
                angle = -45;
            }
        }

        return angle;
    },
    getNextPoint: function(tiles, startPoint, currentPoint, step) {
        var availSteps = [],
            possibleSteps = [
                {y: currentPoint.y - 1, x: currentPoint.x, a: 0, pa: 0, ta: 0},     // up
                {y: currentPoint.y, x: currentPoint.x + 1, a: 90, pa: 90, ta: 90},   // right
                {y: currentPoint.y + 1, x: currentPoint.x, a: 180, pa: 180, ta: 180}, // down
                {y: currentPoint.y, x: currentPoint.x - 1, a: 270, pa: 270, ta: 270}, // left
            ];

        for (var i = 0; i <= possibleSteps.length - 1; i++) {
            if (this.isAvailCell(tiles, possibleSteps[i])) {
                availSteps.push(possibleSteps[i]);
            }
        }

        if (availSteps.length == 2 && step >= this.minStep) {
            for (var i = 0; i <= availSteps.length - 1; i++) {
                if (availSteps[i].x == startPoint.x && availSteps[i].y == startPoint.y) {
                    availSteps = [availSteps[i]];
                }
            }
        }

        if (availSteps.length > 0) {
            return availSteps[this.getRandomInt(0, availSteps.length)];
        }

        return false;
    },
    setupStartPoint: function(path) {
        var up = 0, down = 0,
            left = 0, right = 0,
            startSet = false,
            order = 0;

        for (var i = 0; i <= path.length - 1; i++) {
            path[i].d = this.getDirectionByAngle(path[i].a);

            if (!startSet) {
                switch(path[i].a) {
                    case 0: up++; break;
                    case 90: right++; break;
                    case 180: down++; break;
                    case 270: left++; break;
                    default:
                        up = left = right = down = 0;
                }

                if (up >= 3 || down >= 3 || left >= 3 || right >= 3) {
                    path[i-1].d = 'start-' + path[i-1].d;
                    path[i-1].start = true;
                    path[i-1].order = order;
                    path[i].order = ++order;

                    switch(path[i].a) {
                        case 0: path[i-1].finishPoint = {x: 0, y: 296}; break;
                        case 90: path[i-1].finishPoint = {x: 296, y: 0}; break;
                        case 180: path[i-1].finishPoint = {x: 0, y: -296}; break;
                        case 270: path[i-1].finishPoint = {x: -296, y: 0}; break;
                    }
  
                    startSet = true;
                }
            } else {
                path[i].order = ++order;
            }
        }

        for (var i = 0; i <= path.length - 1; i++) {
            if (path[i].order == undefined) {
                path[i].order = ++order;
            }
        }

        return startSet;
    },
    isAvailCell: function(tiles, point) {
        if (point.x >= 0 && point.x <= (this.mapSize - 1) && point.y >= 0 && point.y <= (this.mapSize - 1)) {
            return tiles[point.y][point.x] == '' || tiles[point.y][point.x] === 0;
        }

        return false;
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getTileByDirection: function(direction) {
        var tile = new cc.TileMap(this.mapType, direction, true);

        tile.setName(direction);

        return tile;
    },
    getDirectionByAngle: function(angle) {
        var direction = '';

        switch (angle) {
            case 0:
            case 360:
                direction = 'south-north'; break;
            case 45: direction = 'north-east'; break;
            case 90: direction = 'west-east'; break;
            case 270: direction = 'east-west'; break;
            case 135: direction = 'south-east'; break;
            case 180: direction = 'north-south'; break;
            case 225: direction = 'south-west'; break;
            case 315: direction = 'north-west'; break;
        }

        return direction;
    }
});
