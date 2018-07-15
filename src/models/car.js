'use strict';

cc.Car = cc.Class.extend({
    ctor: function (params, control) {
        this.control = control;
        this.controlKeys = {
            up: false,
            left: false,
            right: false,
            down: false
        };

        this.currentSpeed = 0;
        this.maxSpeed = params.maxSpeed;
        this.maxReverseSpeed = params.maxReverseSpeed;
        this.speedAcceleration = params.maxSpeed;
        this.speedDeceleration = params.maxReverseSpeed;
        this.breakingDeceleration = params.maxSpeed * 2;
        this.outOfTrackRatio = params.outOfTrackRatio;
        this.speedRatio = 0;
        this.drift = params.drift;
        this.outOfTrack = false;
        this.prevOutOfTrack = false;

        this.currentAngle = 0;
        this.currentAngleWheels = 0;
        this.maxAngleWheels = params.maxAngleWheels;
        this.rotateAcceleration = params.maxAngleWheels * 6;
        this.rotateDeceleration = params.maxAngleWheels * 8;

        this.sprite = cc.PhysicsSprite.create('#car_' + params.color + '_' + params.number + '.png');
        this.sprite.setScale(params.scale);

        this.size = this.sprite.getContentSize();
        this.size.width = this.size.width * params.scale
        this.size.height = this.size.height * params.scale
    },
    accelerate: function(value, acceleration, dt) {
        return value + (acceleration * dt);
    },
    decelerate: function(value, deceleration, dt) {
        return value - (deceleration * dt);
    },
    updateSpeed: function(dt) {
        if ((this.controlKeys.up && this.controlKeys.down) || (!this.controlKeys.up && !this.controlKeys.down)) {
            if (this.currentSpeed > 0) {
                this.currentSpeed = this.decelerate(this.currentSpeed, this.speedDeceleration, dt);

                if (this.currentSpeed < 0) {
                    this.currentSpeed = 0;
                }
            } else if (this.currentSpeed < 0) {
                this.currentSpeed = this.accelerate(this.currentSpeed, this.speedDeceleration, dt);

                if (this.currentSpeed > 0) {
                    this.currentSpeed = 0;
                }
            }
        } else if (this.controlKeys.up) {
            var currentSpeed = this.currentSpeed;

            if (this.currentSpeed < this.maxSpeed) {
                currentSpeed = this.accelerate(this.currentSpeed, this.speedAcceleration, dt);

                if (currentSpeed > this.maxSpeed) {
                    currentSpeed = this.maxSpeed;
                }
            } else if (this.currentSpeed > this.maxSpeed) {
                currentSpeed = this.decelerate(this.currentSpeed, this.breakingDeceleration, dt);

                if (currentSpeed < this.maxSpeed) {
                    currentSpeed = this.maxSpeed;
                }
            }

            this.currentSpeed = currentSpeed;
        } else if (this.controlKeys.down) {
            var currentSpeed = this.currentSpeed;

            if (this.currentSpeed > -this.maxReverseSpeed) {
                currentSpeed = this.decelerate(this.currentSpeed, this.speedAcceleration, dt);

                if (currentSpeed < -this.maxReverseSpeed) {
                    currentSpeed = -this.maxReverseSpeed;
                }
            } else if (this.currentSpeed < -this.maxReverseSpeed) {
                currentSpeed = this.accelerate(this.currentSpeed, this.breakingDeceleration, dt);

                if (currentSpeed > -this.maxReverseSpeed) {
                    currentSpeed = -this.maxReverseSpeed;
                }
            }

            this.currentSpeed = currentSpeed;
        }

        if (this.outOfTrack != this.prevOutOfTrack) {
            this.prevOutOfTrack = this.outOfTrack;

            if (this.outOfTrack) {
                this.maxSpeed *= this.outOfTrackRatio;
                this.maxReverseSpeed *= this.outOfTrackRatio;
                this.maxAngleWheels *= this.outOfTrackRatio;
            } else {
                this.maxSpeed /= this.outOfTrackRatio;
                this.maxReverseSpeed /= this.outOfTrackRatio;
                this.maxAngleWheels /= this.outOfTrackRatio;
            }
        }

        this.speedRatio = this.currentSpeed / 300;

        this.velocity = cp.v(
            Math.cos((this.currentAngle - 90) * 0.01745) * this.currentSpeed,
            Math.sin((this.currentAngle + 90) * 0.01745) * this.currentSpeed
        );

        if (this.currentSpeed < 0) {
            this.velocity = this.velocity.project(this.velocity);
        }

        if (this.drift) {
	        if (this.controlKeys.left || this.controlKeys.right) {
	            this.body.applyImpulse(this.velocity, this.velocity);
	        } else {
	            this.body.applyImpulse(this.velocity, cp.v(0, 0));
	        }
        } else {
        	this.body.setVel(cp.v.mult(this.velocity, 3.5));
        }
    },
    updateAngle: function(dt) {
        if ((this.controlKeys.left && this.controlKeys.right) || (!this.controlKeys.left && !this.controlKeys.right)) {
            var currentAngleWheels = this.currentAngleWheels;

            if (this.currentAngleWheels < 0) {
                currentAngleWheels = this.accelerate(this.currentAngleWheels, this.rotateDeceleration, dt);

                if (currentAngleWheels > 0) {
                    currentAngleWheels = 0;
                }
            } else if (this.currentAngleWheels > 0) {
                currentAngleWheels = this.decelerate(this.currentAngleWheels, this.rotateDeceleration, dt);

                if (currentAngleWheels < 0) {
                    currentAngleWheels = 0;
                }
            }

            this.currentAngleWheels = currentAngleWheels;
        } else if (this.controlKeys.left) {
            var currentAngleWheels = this.decelerate(this.currentAngleWheels, this.rotateAcceleration, dt);

            if (-this.maxAngleWheels < currentAngleWheels) {
                this.currentAngleWheels = currentAngleWheels;
            } else {
                this.currentAngleWheels = -this.maxAngleWheels;
            }
        } else if (this.controlKeys.right) {
            var currentAngleWheels = this.accelerate(this.currentAngleWheels, this.rotateAcceleration, dt);

            if (this.maxAngleWheels > currentAngleWheels) {
                this.currentAngleWheels = currentAngleWheels;
            } else {
                this.currentAngleWheels = this.maxAngleWheels;
            }
        }

        var rotateRatio = this.currentSpeed / this.maxSpeed;

        if (this.currentSpeed != 0) {
            this.currentAngle += this.currentAngleWheels * rotateRatio;
        }

        if (this.currentAngle >= 360 || this.currentAngle <= -360) {
            this.currentAngle = 0;
        }

        this.body.setAngle(-this.currentAngle * 0.01745);
    }
});