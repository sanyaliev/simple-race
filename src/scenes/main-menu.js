'use strict';

var MainMenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        this.addChild(new MainMenuLayer());
    }
});
