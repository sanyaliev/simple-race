'use strict';

var MainMenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        // add menu background
        this.bg = new cc.Sprite(resourcesMap.menuBgPNG.src);
        this.bg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.bg.setOpacity(490);
        this.addChild(this.bg, 0);

        // add game name label
        this.gameNameLabel = new cc.LabelTTF('Simple race game', resourcesMap.kenVectorFontTTF.name, 34);
        this.gameNameLabel.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.6);
        this.gameNameLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.addChild(this.gameNameLabel, 0);

        // add comment label
        this.commentLabel = new cc.LabelTTF('Test task', resourcesMap.kenVectorFontTTF.name, 24);
        this.commentLabel.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.55);
        this.commentLabel.setColor(cc.color(255, 206, 0, 1));
        this.commentLabel.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(3, -3), 3);
        this.addChild(this.commentLabel, 0);

        // add author label
        this.authorLabel = new cc.LabelTTF('Author: sanyaliev', resourcesMap.kenVectorFontTTF.name, 10);
        this.authorLabel.setPosition(cc.winSize.width * 0.91, cc.winSize.height * 0.11);
        this.authorLabel.setColor(cc.color(80, 77, 77, 0));
        this.addChild(this.authorLabel, 0);

        // add start game btn
        this.startButton = new Button('Start game', 20, 'green', function() {
            cc.director.runScene(new cc.TransitionFade(0.3, new PrepareRaceScene()));
        });
        this.startButton.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.45);
        this.addChild(this.startButton, 1);
    }
});
