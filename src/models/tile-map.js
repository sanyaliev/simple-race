'use strict';

var mapTiles = {
    'asphalt': {
        'south-north': [
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png'],
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png'],
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png']
        ],
        'north-east': [
            ['#road_asphalt04.png', '#road_asphalt10.png', '#road_asphalt11.png'],
            ['#road_asphalt22.png', '#road_asphalt22.png', '#road_asphalt29.png'],
            ['#road_asphalt28.png', '#road_asphalt22.png', '#road_asphalt23.png']
        ],
        'west-east': [
            ['#road_asphalt04.png', '#road_asphalt04.png', '#road_asphalt04.png'],
            ['#road_asphalt22.png', '#road_asphalt22.png', '#road_asphalt22.png'],
            ['#road_asphalt40.png', '#road_asphalt40.png', '#road_asphalt40.png']
        ],
        'south-east': [
            ['#road_asphalt46.png', '#road_asphalt22.png', '#road_asphalt23.png'],
            ['#road_asphalt22.png', '#road_asphalt22.png', '#road_asphalt47.png'],
            ['#road_asphalt40.png', '#road_asphalt64.png', '#road_asphalt65.png']
        ],
        'north-south': [
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png'],
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png'],
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png']
        ],
        'south-west': [
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt45.png'],
            ['#road_asphalt44.png', '#road_asphalt22.png', '#road_asphalt22.png'],
            ['#road_asphalt62.png', '#road_asphalt63.png', '#road_asphalt40.png']
        ],
        'east-west': [
            ['#road_asphalt04.png', '#road_asphalt04.png', '#road_asphalt04.png'],
            ['#road_asphalt22.png', '#road_asphalt22.png', '#road_asphalt22.png'],
            ['#road_asphalt40.png', '#road_asphalt40.png', '#road_asphalt40.png']
        ],
        'north-west': [
            ['#road_asphalt08.png', '#road_asphalt09.png', '#road_asphalt04.png'],
            ['#road_asphalt26.png', '#road_asphalt22.png', '#road_asphalt22.png'],
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt27.png']
        ],
        'start-south-north': [
            ['#road_asphalt69.png', '#road_asphalt70.png', '#road_asphalt71.png'],
            ['#road_asphalt21.png', '#road_asphalt83.png', '#road_asphalt23.png'],
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png']
        ],
        'start-north-south': [
            ['#road_asphalt21.png', '#road_asphalt22.png', '#road_asphalt23.png'],
            ['#road_asphalt21.png', '#road_asphalt85.png', '#road_asphalt23.png'],
            ['#road_asphalt69.png', '#road_asphalt70.png', '#road_asphalt71.png']
        ],
        'start-west-east': [
            ['#road_asphalt04.png', '#road_asphalt04.png', '#road_asphalt87.png'],
            ['#road_asphalt22.png', '#road_asphalt84.png', '#road_asphalt88.png'],
            ['#road_asphalt40.png', '#road_asphalt40.png', '#road_asphalt89.png']
        ],
        'start-east-west': [
            ['#road_asphalt87.png', '#road_asphalt04.png', '#road_asphalt04.png'],
            ['#road_asphalt88.png', '#road_asphalt86.png', '#road_asphalt22.png'],
            ['#road_asphalt89.png', '#road_asphalt40.png', '#road_asphalt40.png']
        ],
        'background': [
            ['#land_grass11.png', '#land_grass04.png', '#land_grass11.png'],
            ['#land_grass04.png', '#land_grass11.png', '#land_grass04.png'],
            ['#land_grass11.png', '#land_grass04.png', '#land_grass11.png'],
        ]
    },
    'dirt': {
        'south-north': [
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png'],
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png'],
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png']
        ],
        'north-east': [
            ['#road_dirt03.png', '#road_dirt09.png', '#road_dirt10.png'],
            ['#road_dirt21.png', '#road_dirt21.png', '#road_dirt28.png'],
            ['#road_dirt27.png', '#road_dirt21.png', '#road_dirt22.png']
        ],
        'west-east': [
            ['#road_dirt03.png', '#road_dirt03.png', '#road_dirt03.png'],
            ['#road_dirt21.png', '#road_dirt21.png', '#road_dirt21.png'],
            ['#road_dirt39.png', '#road_dirt39.png', '#road_dirt39.png']
        ],
        'south-east': [
            ['#road_dirt45.png', '#road_dirt21.png', '#road_dirt22.png'],
            ['#road_dirt21.png', '#road_dirt21.png', '#road_dirt46.png'],
            ['#road_dirt39.png', '#road_dirt63.png', '#road_dirt64.png']
        ],
        'north-south': [
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png'],
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png'],
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png']
        ],
        'south-west': [
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt44.png'],
            ['#road_dirt43.png', '#road_dirt21.png', '#road_dirt21.png'],
            ['#road_dirt61.png', '#road_dirt62.png', '#road_dirt39.png']
        ],
        'east-west': [
            ['#road_dirt03.png', '#road_dirt03.png', '#road_dirt03.png'],
            ['#road_dirt21.png', '#road_dirt21.png', '#road_dirt21.png'],
            ['#road_dirt39.png', '#road_dirt39.png', '#road_dirt39.png']
        ],
        'north-west': [
            ['#road_dirt07.png', '#road_dirt08.png', '#road_dirt03.png'],
            ['#road_dirt25.png', '#road_dirt21.png', '#road_dirt21.png'],
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt26.png']
        ],
        'start-south-north': [
            ['#road_dirt68.png', '#road_dirt69.png', '#road_dirt70.png'],
            ['#road_dirt20.png', '#road_dirt82.png', '#road_dirt22.png'],
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png']
        ],
        'start-north-south': [
            ['#road_dirt20.png', '#road_dirt21.png', '#road_dirt22.png'],
            ['#road_dirt20.png', '#road_dirt84.png', '#road_dirt22.png'],
            ['#road_dirt68.png', '#road_dirt69.png', '#road_dirt70.png']
        ],
        'start-west-east': [
            ['#road_dirt03.png', '#road_dirt03.png', '#road_dirt86.png'],
            ['#road_dirt21.png', '#road_dirt83.png', '#road_dirt87.png'],
            ['#road_dirt39.png', '#road_dirt39.png', '#road_dirt88.png']
        ],
        'start-east-west': [
            ['#road_dirt86.png', '#road_dirt03.png', '#road_dirt03.png'],
            ['#road_dirt87.png', '#road_dirt85.png', '#road_dirt21.png'],
            ['#road_dirt88.png', '#road_dirt39.png', '#road_dirt39.png']
        ],
        'background': [
            ['#land_dirt05.png', '#land_dirt12.png', '#land_dirt05.png'],
            ['#land_dirt12.png', '#land_dirt05.png', '#land_dirt12.png'],
            ['#land_dirt05.png', '#land_dirt12.png', '#land_dirt05.png'],
        ]
    }
};

cc.TileMap = cc.Node.extend({
    ctor: function (type, direction) {
    	this._super();

        if (!direction) {
            return;
        }

        this.tiles = [];
    	this.tileType = type;
    	this.tileDirection = direction;

    	this.createTile();
    },
    createTile: function() {
        var tiles = mapTiles[this.tileType][this.tileDirection];
 
        if (tiles == undefined) {
            return;
        }

        var tilePoint = this.getBoundingBox();

        tilePoint.x = tilePoint.x - (128 * (tiles[0].length - 1) / 2);
        tilePoint.y = tilePoint.y + (128 * (tiles.length - 1) / 2);

        for (var i = 0; i <= tiles.length - 1; i++) {
            if (this.tiles[i] == undefined) {
                this.tiles[i] = [];
            }

            for (var j = 0; j <= tiles[i].length - 1; j++) {
                this.tiles[i][j] = new cc.Sprite(tiles[i][j]);

                var size = this.tiles[i][j].getContentSize();

                this.tiles[i][j].setPosition({
                    x: tilePoint.x + (size.width * j),
                    y: tilePoint.y + (size.height * -i)
                });

                this.addChild(this.tiles[i][j], 0);
            }
        }

        this.setContentSize(cc.size(128 * tiles[0].length, 128 * tiles.length));
    }
});
