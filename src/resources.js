'use strict';

var resourcesMap = {
	// image
    menuBgPNG: {type: 'png', src: 'res/images/menu-bg.png'},
    spritePNG: {type: 'png', src: 'res/images/sprites/sprite.png'},
    spriteUIPNG: {type: 'png', src: 'res/images/sprites/sprite-ui.png'},

    // plist
    spritePlist: {type: 'plist', src: 'res/images/sprites/sprite.plist'},
    spriteUIPlist: {type: 'plist', src: 'res/images/sprites/sprite-ui.plist'},

    // fonts
    kenVectorFontTTF: {name: 'kenvector_future', type: 'ttf', srcs: 'res/fonts/kenvector_future.ttf'},
    kenVectorThinFontTTF: {name: 'kenvector_future_thin', type: 'ttf', srcs: 'res/fonts/kenvector_future.ttf'}
};

var resourcesArray = [
    resourcesMap.menuBgPNG,
    resourcesMap.spritePNG,
    resourcesMap.spriteUIPNG,
    resourcesMap.spritePlist,
    resourcesMap.spriteUIPlist,
    resourcesMap.kenVectorFontTTF.srcs,
    resourcesMap.kenVectorThinFontTTF.srcs
];
