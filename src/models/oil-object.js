'use strict';

cc.OilObject = cc.Node.extend({
    ctor: function (space, position) {
    	this._super();

        this.space = space;

    	this.createObject(position);
    },
    createObject: function(oilPoint) {
        var oilSprite = new cc.Sprite('#oil.png');

        oilSprite.setScale(0.9);

        this.addChild(oilSprite, 0);

        var oilSize = oilSprite.getBoundingBox();

        oilSprite.setPosition(cc.p(oilPoint.x + oilSize.width / 1.6, oilPoint.y + oilSize.height / 1.5));

        for (var i = 0; i <= 4; i++) {
            for (var j = 0; j <= 4; j++) {
                var coneSprite = cc.PhysicsSprite.create('#cone_straight.png');

                coneSprite.setScale(0.7);

                var coneSize = coneSprite.getBoundingBox(),
                    coneBody = this.space.addBody(new cp.Body(1, cp.momentForBox(1, coneSize.width, coneSize.height)));

                coneSprite.setBody(coneBody);

                var coneShape = new cp.BoxShape(coneBody, coneSize.width, coneSize.height);

                coneShape.setFriction(1);
                coneShape.setElasticity(0.5);
                coneShape.setCollisionType(0);

                coneSprite.setPosition({
                    x: oilPoint.x + (coneSize.width * j),
                    y: oilPoint.y - (coneSize.height * -i)
                });

                this.space.addShape(coneShape);

                this.addChild(coneSprite, 1);

                if (i == 1 || i == 2 || i == 3) {
                    j += 3;
                }
            }
        }
    }
});
