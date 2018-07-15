'use strict';

var RaceTrackScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        this.addChild(new RaceTrackLayer());
    }
});
