'use strict';

var PrepareRaceLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var self = this,
            size = cc.winSize;

        // add menu background
        this.bg = new cc.Sprite(resourcesMap.menuBgPNG.src);
        this.bg.setPosition(size.width / 2,size.height / 2);
        this.bg.setOpacity(490);
        this.bg.setRotation(180);
        this.addChild(this.bg, 0);

        // add go ride btn
        this.goRideButton = new Button('Go ride!', 20, 'red', function() {
            cc.director.runScene(new cc.TransitionFade(0.3, new RaceTrackScene()));
        });
        this.goRideButton.setPosition(size.width * 0.5, size.height * 0.27);
        this.goRideButton.setEnabled(false);
        this.addChild(this.goRideButton, 1);

        // add choice car label
        this.choiceCarLabel = new cc.LabelTTF('Choice race car:', resourcesMap.kenVectorFontTTF.name, 27);
        this.choiceCarLabel.setPosition(size.width * 0.5, size.height * 0.75);
        this.choiceCarLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.addChild(this.choiceCarLabel, 0);

        // add red car
        this.redCarButton = new CarButton('red', 1, 220, 90, 4, 7.5, 0.5, false, 0.7, function() {
            if (cc.storage.selectedMap.type) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.redCarButton.setPosition(size.width * 0.4, size.height * 0.65);
        this.addChild(this.redCarButton, 1);

        // add green car
        this.greenCarButton = new CarButton('green', 2, 200, 80, 4, 7, 0.35, false, 0.65, function() {
            if (cc.storage.selectedMap.type) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.greenCarButton.setPosition(size.width * 0.45, size.height * 0.65);
        this.addChild(this.greenCarButton, 1);

        // add blue car
        this.blueCarButton = new CarButton('blue', 3, 200, 80, 4.5, 7.5, 0.5, false, 0.7, function() {
            if (cc.storage.selectedMap.type) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.blueCarButton.setPosition(size.width * 0.5, size.height * 0.65);
        this.addChild(this.blueCarButton, 1);

        // add black car
        this.blackCarButton = new CarButton('black', 4, 220, 80, 4, 8, 0.7, false, 0.75, function() {
            if (cc.storage.selectedMap.type) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.blackCarButton.setPosition(size.width * 0.55, size.height * 0.65);
        this.addChild(this.blackCarButton, 1);

        // add yellow car
        this.yellowCarButton = new CarButton('yellow', 5, 180, 70, 3.5, 7.5, 0.4, false, 0.7, function() {
            if (cc.storage.selectedMap.type) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.yellowCarButton.setPosition(size.width * 0.6, size.height * 0.65);
        this.addChild(this.yellowCarButton, 1);

        // add choice track label
        this.choiceMapLabel = new cc.LabelTTF('Choice track:', resourcesMap.kenVectorFontTTF.name, 27);
        this.choiceMapLabel.setPosition(size.width * 0.5, size.height * 0.55);
        this.choiceMapLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.addChild(this.choiceMapLabel, 0);

        // add asphalt map button
        this.asphaltMapButton = new MapButton('asphalt', 8, false, function() {
            if (cc.storage.selectedCar.number) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.asphaltMapButton.setPosition(size.width * 0.45, size.height * 0.45);
        this.addChild(this.asphaltMapButton, 1);

        // add dirt map button
        this.dirtMapButton = new MapButton('dirt', 6, true, function() {
            if (cc.storage.selectedCar.number) {
                self.goRideButton.setEnabled(true);
            }
        });
        this.dirtMapButton.setPosition(size.width * 0.55, size.height * 0.45);
        this.addChild(this.dirtMapButton, 1);
    }
});
