'use strict';

var PrepareRaceScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        this.addChild(new PrepareRaceLayer());
    }
});