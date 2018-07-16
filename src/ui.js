'use strict';

var Button = ccui.Button.extend({
  ctor: function(label, fontSize, color, callback) {
    this._super();
  
    this.createButton(label, fontSize, color);
    this.createListeners(callback)
  },
  createButton: function(label, fontSize, color) {
    this.setName(label);

    switch (color) {
      case 'red':
        this.loadTextures('red_button01.png', 'red_button13.png', 'grey_button03.png', ccui.Widget.PLIST_TEXTURE);
        break;
      case 'green':
        this.loadTextures('green_button04.png', 'green_button02.png', 'grey_button03.png', ccui.Widget.PLIST_TEXTURE);
        break;
      default:
        this.loadTextures('grey_button03.png', 'green_button03.png', 'grey_button03.png', ccui.Widget.PLIST_TEXTURE);
        this.setOpacity(0);
    }

    var size = this.getContentSize();

    var labelBtn = new cc.LabelTTF(label, resourcesMap.kenVectorFontTTF.name, fontSize);

    labelBtn.setPosition(size.width * 0.5, size.height * 0.5);
    labelBtn.enableShadow(cc.color(0, 0, 0, 0.5), cc.size(1, -1), 2);

    this.addChild(labelBtn, 4);
  },
  createListeners: function(callback) {
    this.addTouchEventListener(this.touchEvent(callback), this);
  },
  touchEvent: function(callback) {
    return function(sender, type) {
      if (type == ccui.Widget.TOUCH_ENDED && callback !== undefined) {
        callback();
      }
    };
  }
});

var CarButton = ccui.Button.extend({
  ctor: function(color, number, maxSpeed, maxReverseSpeed, maxAngleWheels, mass, outOfTrackRatio, drift, scale, callback) {
    this._super();

    this.currentCar = {
      color: color,
      number: number,
      maxSpeed: maxSpeed,
      maxAngleWheels: maxAngleWheels,
      maxReverseSpeed: maxReverseSpeed,
      mass: mass,
      scale: scale,
      outOfTrackRatio: outOfTrackRatio,
      drift: drift
    };

    this.createButton();
    this.createListeners(callback);
    this.resetEvent();
  },
  createButton: function() {
    var texture = 'car_' + this.currentCar.color + '_small_' + this.currentCar.number + '.png';

    this.loadTextureNormal(texture, ccui.Widget.PLIST_TEXTURE);
  },
  createListeners: function(callback) {
    var self = this;

    cc.eventManager.addCustomListener('resetSelectedCarButton', function() {
      self.resetEvent();
    });
    this.addTouchEventListener(this.touchEvent(callback), this);
  },
  resetEvent: function() {
      cc.storage.selectedCar.color = '';
      cc.storage.selectedCar.number = 0;
      cc.storage.selectedCar.maxSpeed = 0;
      cc.storage.selectedCar.maxReverseSpeed = 0;
      cc.storage.selectedCar.maxAngleWheels = 0;
      cc.storage.selectedCar.outOfTrackRatio = 0;
      cc.storage.selectedCar.mass = 0;
      cc.storage.selectedCar.scale = 0;
      cc.storage.selectedCar.drift = false;

      this.setScale(1);
  },
  touchEvent: function(callback) {
    var self = this;

    return function(sender, type) {
      if (type == ccui.Widget.TOUCH_ENDED) {
        cc.eventManager.dispatchCustomEvent('resetSelectedCarButton');

        self.setScale(1.2);

        cc.storage.selectedCar.color = this.currentCar.color;
        cc.storage.selectedCar.number = this.currentCar.number;
        cc.storage.selectedCar.maxSpeed = this.currentCar.maxSpeed;
        cc.storage.selectedCar.maxReverseSpeed = this.currentCar.maxReverseSpeed;
        cc.storage.selectedCar.maxAngleWheels = this.currentCar.maxAngleWheels;
        cc.storage.selectedCar.outOfTrackRatio = this.currentCar.outOfTrackRatio;
        cc.storage.selectedCar.mass = this.currentCar.mass;
        cc.storage.selectedCar.scale = this.currentCar.scale;
        cc.storage.selectedCar.drift = this.currentCar.drift;

        if (callback !== undefined) {
          callback();
        }
      }
    };
  }
});

var MapButton = ccui.Button.extend({
  ctor: function(type, size, drift, callback) {
    this._super();

    this.currentMap = {
      type: type,
      size: size,
      drift: drift
    };

    this.createButton();
    this.createListeners(callback);
    this.resetEvent();
  },
  createButton: function() {
    var texture = '';

    switch(this.currentMap.type) {
      case 'dirt': texture = 'road_dirt59.png'; break;
      case 'asphalt': texture = 'road_asphalt60.png'; break;
    }

    this.loadTextureNormal(texture, ccui.Widget.PLIST_TEXTURE);
    this.setScale(0.6);
  },
  createListeners: function(callback) {
    var self = this;

    cc.eventManager.addCustomListener('resetSelectedMapButton', function() {
      self.resetEvent();
    });

    this.addTouchEventListener(this.touchEvent(callback), this);
  },
  resetEvent: function() {
      cc.storage.selectedMap.type = '';
      cc.storage.selectedMap.size = 0;
      cc.storage.selectedCar.drift = false;

      this.setScale(0.6);
  },
  touchEvent: function(callback) {
    var self = this;

    return function(sender, type) {
      if (type == ccui.Widget.TOUCH_ENDED) {
        cc.eventManager.dispatchCustomEvent('resetSelectedMapButton');

        this.setScale(0.7);

        cc.storage.selectedMap.type = this.currentMap.type;
        cc.storage.selectedMap.size = this.currentMap.size;
        cc.storage.selectedCar.drift = this.currentMap.drift;

        if (callback !== undefined) {
          callback();
        }
      }
    };
  }
});
