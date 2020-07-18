module.exports =  class SubCorridor {
    constructor() {
        this.ac  = 1;
        this.light = 0;
    }

    /**
     * @function getSate
     * @param {String} device ac | light
     * @returns {Number} 0 | 1
     * Method to get current state of given device
     */
    getSate(device) {
        return this[device];
    }

    /**
     * @function setState
     * @param {String} device ac | light
     * @param {Number} state 0 | 1
     * Method to set state of given device
     */
    setState(device, state) {
        this[device] = state;
    }
}