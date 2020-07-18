module.exports =  class MainCorridor {
    constructor() {
        this.ac  = 1;
        this.light = 1;
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
}