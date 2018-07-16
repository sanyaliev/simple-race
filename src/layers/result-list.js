'use strict';

var ResultListLayer = cc.Layer.extend({
    ctor: function(prevScene) {
        this._super();

        this.prevScene = prevScene;

        var self = this,
            size = cc.winSize;

        // add menu background
        this.bg = new cc.Sprite(resourcesMap.menuBgPNG.src);
        this.bg.setPosition(size.width / 2, size.height / 2);
        this.bg.setOpacity(490);
        this.bg.setScale(1.5);
        this.addChild(this.bg, 0);

        // add title label
        this.titleLabel = new cc.LabelTTF('Top results', resourcesMap.kenVectorFontTTF.name, 27);
        this.titleLabel.setPosition(size.width * 0.5, size.height * 0.8);
        this.titleLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.addChild(this.titleLabel, 0);

        var list = cc.storage.topPlayerList;

        list.sort(function(a, b) {
            return a.bestTime - b.bestTime;
        });

        if (list.length) {
            for (var i = 0; i <= list.length - 1; i++) {
                var number = i + 1,
                    mapType = list[i].mapType,
                    mapLength = list[i].mapLength,
                    bestTime = new Date(list[i].bestTime).toISOString().slice(-13, -5);

                var string = number + '. map: ' + mapType +', length: ' + mapLength + ', best time: ' + bestTime;

                var resultLabel = new cc.LabelTTF(string, resourcesMap.kenVectorFontTTF.name, 19);
                resultLabel.setPosition(size.width * 0.5, size.height - (size.height * ((i + 6) / 20)));
                resultLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
                this.addChild(resultLabel, 0);

                if (i >= 9) {
                    break;
                }
            }
        }

        // add back button
        this.backButton = new Button('return', 20, 'red', function() {
            self.prevScene.startLapTime += Date.now() - self.prevScene.currentLapTime;
            cc.director.runScene(new cc.TransitionFade(0.3, self.prevScene));
        });
        this.backButton.setPosition(size.width * 0.5, size.height * 0.1);
        this.addChild(this.backButton, 0);
    }
});
