'use strict';

cc.Storage = cc.Class.extend({
	selectedCar: {
		number: 0,
		color: '',
		maxSpeed: 0,
		maxReverseSpeed: 0,
		maxAngleWheels: 0,
		mass: 20,
		scale: 0.7,
		offRoadRatio: 0
	},
	selectedMap: {
		type: '',
		size: 0,
		drift: false
	}
});

cc.storage = new cc.Storage();
