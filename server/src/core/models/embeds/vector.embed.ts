import { Float } from '../../../shared/types/base.types';

export default class Vector {
    constructor(public x: Float, public y: Float) {}
    public static of(x: Float, y: Float): Vector {
        return new Vector(x, y);
    }
    public static ofTuple(tuple: [Float, Float]) {
        return this.of(...tuple);
    }

    get asTuple(): [Float, Float] {
        return [this.x, this.y];
    }

    get clone(): Vector {
        return Vector.of(this.x, this.y);
    }

    public distanceTo(v: Vector): Float {
        return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2);
    }
}
