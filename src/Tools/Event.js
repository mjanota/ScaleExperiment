class Event {
    constructor(type, target, nativeEvent) {
        this.type = type;
        this.target = target;
        this.native = nativeEvent;
        this.defaultPrevented = false;
        this.onComplete = () => { };
    }

    preventDefault() {
        this.defaultPrevented = true;
        this.native.preventDefault();
    }

    isDefaultPrevented() {
        return this.defaultPrevented;
    }
}

export default Event;
