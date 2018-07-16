'use strict';

var ResultListScene = cc.Scene.extend({
	ctor: function(prevScene) {
        this._super();
        this.prevScene = prevScene;
    },
    onEnter: function() {
        this._super();

        this.addChild(new ResultListLayer(this.prevScene));
    }
});