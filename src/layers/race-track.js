'use strict';

var RaceTrackLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.setTag('race-layer');

        this.raceStarted = false;
        this.lap = 0;
        this.maxLaps = 3;

        this.createListeners();

        this.initSpace();
        // this.createDebugNode();

        this.createMap();
        this.addCars();
        this.addObjects();
        this.addUIElements();
        this.startCountdown(3);

        this.scheduleUpdate();
    },
    createListeners: function() {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: this.onKeyPress,
            onKeyPressed: this.onKeyPress,
        }, this);
    },
    onKeyPress: function(key, event) {
        this._node.cars.forEach(function(car) {
            if (car.control) {
                switch (key) {
                    case 38: car.controlKeys.up = event._isPressed; break;
                    case 37: car.controlKeys.left = event._isPressed; break;
                    case 39: car.controlKeys.right = event._isPressed; break;
                    case 40: car.controlKeys.down = event._isPressed; break;
                }
            }
        });
    },
    startCountdown: function(count) {
        var self = this;

        if (!this.countdownStarted) {
            this.countdownStarted = true;

            var interval = setInterval(function() {
                if (count == 0) {
                    var go = new cc.LabelTTF('Lets go!', resourcesMap.kenVectorFontTTF.name, 42);
                    go.setPosition(self.startPosition.x, self.startPosition.y + cc.winSize.height * 0.2);
                    go.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);

                    setTimeout(function() {
                        go.runAction(cc.fadeOut(0.5));
                    }, 1000);

                    self.addChild(go, 3);

                    clearInterval(interval);

                    self.startRace();

                    self.countdownStarted = false;

                    return;
                }

                var countdown = new cc.LabelTTF(count, resourcesMap.kenVectorFontTTF.name, 42);
                countdown.setPosition(self.startPosition.x, self.startPosition.y + cc.winSize.height * 0.2);
                countdown.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
                countdown.runAction(cc.fadeOut(0.6));

                self.addChild(countdown, 3);

                count--;
            }, 1000);
        }
    },
    initSpace: function() {
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, 0);
        this.space.iterations = 5;
        this.space.damping = 0.1;
        this.space.collisionSlop = 1;
    },
    createDebugNode: function() {
        this._debug = new cc.PhysicsDebugNode(this.space);
        this._debug.setVisible(true);
        this.addChild(this._debug, 4);
    },
    createMap: function() {
        this.map = new cc.Map(this.space, cc.storage.selectedMap.type, cc.storage.selectedMap.size);
        this.addChild(this.map);

        var startTile = this.map.getChildByTag('start-point'),
            startPosition = startTile.getBoundingBoxToWorld();

        this.startPosition = cc.p(startTile.x, startTile.y);
        this.startRotateAngle = startTile.rotateAngle;
    },
    addCars: function() {
        this.cars = [];

        this.addCar(cc.storage.selectedCar, this.startPosition, this.startRotateAngle, true);
    },
    addCar: function(params, position, angle, control) {
        var car = new cc.Car(params, control);

        car.size = car.sprite.getContentSize();
        car.size.width = car.size.width * params.scale
        car.size.height = car.size.height * params.scale

        car.body = this.space.addBody(new cp.Body(params.mass, cp.momentForBox(params.mass, car.size.width, car.size.height)));
        car.sprite.setBody(car.body);

        car.shape = new cp.BoxShape(car.body, car.size.width, car.size.height);
        car.shape.setFriction(1);
        car.shape.setElasticity(0.3);
        car.shape.setCollisionType(0);

        car.currentAngle = angle;
        car.sprite.setPosition(position);
        car.sprite.setRotation(angle);

        this.space.addShape(car.shape);

        this.addChild(car.sprite, 2);

        this.cars.push(car);
    },
    addObjects: function() {
        var len = this.map.tiles.length - 3,
            randomTile = this.map.tiles[Math.floor(Math.random() * (len - 3)) + 3],
            oilPoint = randomTile.getBoundingBoxToWorld();

        oilPoint.x = oilPoint.x + 384 / 3;
        oilPoint.y = oilPoint.y + 384 / 3;

        var oilSprite = new cc.OilObject(this.space, oilPoint);
        
        this.addChild(oilSprite, 1);
    },
    addUIElements: function() {
        var self = this;

        this.currentLapTimeValueLabel = new cc.LabelTTF('00:00:00', resourcesMap.kenVectorFontTTF.name, 24);
        this.currentLapTimeValueLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);

        this.warningLabel = new cc.LabelTTF('', resourcesMap.kenVectorFontTTF.name, 18);
        this.warningLabel.enableShadow(cc.color(0, 0, 0, 0.3), cc.size(3, -3), 3);
        this.warningLabel.setColor(cc.color(232, 106, 23));
        this.warningLabel.setVisible(false);

        this.lastLapTimeLabel = new cc.LabelTTF('Last time:', resourcesMap.kenVectorFontTTF.name, 20);
        this.lastLapTimeLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.lastLapTimeValueLabel = new cc.LabelTTF('00:00:00', resourcesMap.kenVectorFontTTF.name, 20);
        this.lastLapTimeValueLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);

        this.bestLapTimeLabel = new cc.LabelTTF('Best time:', resourcesMap.kenVectorFontTTF.name, 20);
        this.bestLapTimeLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.bestLapTimeValueLabel = new cc.LabelTTF('00:00:00', resourcesMap.kenVectorFontTTF.name, 20);
        this.bestLapTimeValueLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);

        this.remainingLapsLabel = new cc.LabelTTF('Laps remaining:', resourcesMap.kenVectorFontTTF.name, 20);
        this.remainingLapsLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.remainingLapsValueLabel = new cc.LabelTTF(this.maxLaps, resourcesMap.kenVectorFontTTF.name, 20);
        this.remainingLapsValueLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);

        this.finishLabel = new cc.LabelTTF('Finish!', resourcesMap.kenVectorFontTTF.name, 42);
        this.finishLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.finishLabel.setVisible(false);

        this.mainMenuButton = new Button('Main menu', 17, '', function() {
            cc.director.runScene(new cc.TransitionFade(0.3, new PrepareRaceScene()));
        });

        this.topResultsButton = new Button('Top results', 17, '', function() {
            self.pause();
            cc.director.pushScene(new cc.TransitionFade(0.3, new ResultListScene(self)));
        });

        this.renewMapButton = new Button('Renew map', 17, '', function() {
            cc.director.runScene(new cc.TransitionFade(0.3, new RaceTrackScene()));
        });

        this.addChild(this.currentLapTimeValueLabel, 4);
        this.addChild(this.warningLabel, 4);
        this.addChild(this.lastLapTimeLabel, 4);
        this.addChild(this.lastLapTimeValueLabel, 4);
        this.addChild(this.bestLapTimeLabel, 4);
        this.addChild(this.bestLapTimeValueLabel, 4);
        this.addChild(this.remainingLapsLabel, 4);
        this.addChild(this.remainingLapsValueLabel, 4);
        this.addChild(this.mainMenuButton, 4);
        this.addChild(this.topResultsButton, 4);
        this.addChild(this.renewMapButton, 4);
        this.addChild(this.finishLabel, 4);
    },
    setUIPosition: function(p) {
        var width = cc.winSize.width,
            height = cc.winSize.height;

        this.currentLapTimeValueLabel.setPosition(p.x, p.y + (height * 0.45));
        this.warningLabel.setPosition(p.x, p.y + (height * 0.4));

        this.lastLapTimeLabel.setPosition(p.x - (width * 0.4), p.y + (height * 0.45));
        this.lastLapTimeValueLabel.setPosition(p.x - (width * 0.26), p.y + (height * 0.45));

        this.bestLapTimeLabel.setPosition(p.x + (width * 0.27), p.y + (height * 0.45));
        this.bestLapTimeValueLabel.setPosition(p.x + (width * 0.41), p.y + (height * 0.45));

        this.remainingLapsLabel.setPosition(p.x + (width * 0.33), p.y + (height * 0.4));
        this.remainingLapsValueLabel.setPosition(p.x + (width * 0.46), p.y + (height * 0.4));

        this.mainMenuButton.setPosition(p.x + (width * 0.419), p.y - (height * 0.36));
        this.topResultsButton.setPosition(p.x + (width * 0.403), p.y - (height * 0.41));
        this.renewMapButton.setPosition(p.x + (width * 0.413), p.y - (height * 0.46));

        this.finishLabel.setPosition(p);
    },
    startRace: function() {
        this.raceStarted = true;

        this.currentCheckpoint = 0;

        this.startLapTime = Date.now();
        this.currentLapTime = 0;
        this.lastLapTime = 0;
        this.bestLapTime = 0;

        this.schedule(this.judge, 0.1);
    },
    stopRace: function() {
        this.raceStarted = false;

        this.unschedule(this.judge, 0.1);
    },
    finish: function() {

        this.addChild(this.renewMapButton, 4);
    },
    judge: function() {
        var self = this;

        this.currentLapTime = Date.now();

        this.cars.forEach(function(car) {
            if (car.control) {
                this.outOfTrack = true;
                this.missedCheckpoint = false;

                this.map.tiles.forEach(function(tile) {
                    var tileRect = tile.getBoundingBoxToWorld(),
                        tileSize = tile.getContentSize(),
                        carRect = car.sprite.getBoundingBoxToWorld();

                    tileRect.width = tileSize.width;
                    tileRect.height = tileSize.height;

                    if (cc.rectIntersectsRect(tileRect, carRect)) {
                        if (tile.order == this.currentCheckpoint + 1) {
                            this.currentCheckpoint = tile.order;
                        } else if (tile.order == 0 && this.currentCheckpoint == this.map.tiles.length - 1) {
                            tileRect.x += tile.finishPoint.x;
                            tileRect.y += tile.finishPoint.y;

                            if (cc.rectIntersectsRect(tileRect, carRect)) {
                                this.currentCheckpoint = tile.order;

                                this.lastLapTime = this.currentLapTime - this.startLapTime;

                                if (this.bestLapTime == 0 || this.bestLapTime > this.lastLapTime) {
                                    this.bestLapTime = this.lastLapTime;
                                }

                                this.startLapTime = this.currentLapTime;

                                this.lap++;

                                if (this.lap >= this.maxLaps) {
                                    this.stopRace();

                                    var result = {
                                        mapType: cc.storage.selectedMap.type,
                                        mapLength: this.map.tiles.length,
                                        bestTime: this.bestLapTime
                                    };

                                    var prevResult = cc.storage.topPlayerList.find(function(prevResult) {
                                        if (prevResult.mapType == result.mapType && prevResult.mapLength == result.mapLength) { 
                                            return prevResult;
                                        }
                                    });

                                    if (prevResult == undefined || prevResult.bestTime > result.bestTime) {
                                        var index = cc.storage.topPlayerList.indexOf(prevResult);
                                        if (index >= 0) {
                                            cc.storage.topPlayerList.splice(index, 1);
                                        }

                                        this.finishLabel.setString('Finish and new record!');

                                        cc.storage.topPlayerList.push(result);

                                        setTimeout(function() {
                                            self.pause();
                                            cc.director.pushScene(new cc.TransitionFade(0.3, new ResultListScene(self)));
                                        }, 2000);
                                    }

                                    this.finishLabel.setVisible(true);
                                }
                            }
                        } else if (tile.order > this.currentCheckpoint) {
                            this.missedCheckpoint = true;
                        }

                        this.outOfTrack = false;

                        return true;
                    }
                }, this);

                car.outOfTrack = this.outOfTrack;
            }
        }, this);

        var currentLapDate = new Date(this.currentLapTime - this.startLapTime),
            lastLapDate = new Date(this.lastLapTime),
            bestLapDate = new Date(this.bestLapTime);

        this.currentLapTimeValueLabel.setString(currentLapDate.toISOString().slice(-13, -5));
        this.lastLapTimeValueLabel.setString(lastLapDate.toISOString().slice(-13, -5));
        this.bestLapTimeValueLabel.setString(bestLapDate.toISOString().slice(-13, -5));
        this.remainingLapsValueLabel.setString(this.maxLaps - this.lap);

        if (this.outOfTrack) {
            this.warningLabel.setString('Return back');
            this.warningLabel.setVisible(true);
        } else if (this.missedCheckpoint) {
            this.warningLabel.setString('Missed checkpoint');
            this.warningLabel.setVisible(true);
        } else {
            this.warningLabel.setVisible(false);
        }
    },
    update: function(dt) {
        this.cars.forEach(function(car) {
            if (this.raceStarted) {
                car.updateSpeed(dt);
                car.updateAngle(dt);
            }

            if (car.control) {
                var speedRatio = 1 - (car.speedRatio / 10);

                var position = cc.p(
                    (-car.sprite.getPositionX() + this.getContentSize().width / 2) * speedRatio,
                    (-car.sprite.getPositionY() + this.getContentSize().height / 2) * speedRatio
                );

                this.setScale(speedRatio);
                this.setPosition(position);
                this.setUIPosition(car.sprite.getPosition());
            }
        }, this);

        this.space && this.space.step(1.0 / 60.0);
    }
});
