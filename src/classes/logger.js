const { STATE } = require('../configs/configs');
module.exports = class EventLogger {

    constructor() {
        // Initializer
    }

    /**
     * @function logState
     * @param {String} _area 
     * @param {Number} _cor_id
     * @param {Number} _ac_state 
     * @param {Number} _light_state 
     * Method to log devices state
     */
    logState(_area, _cor_id, _ac_state, _light_state) {
        console.log(`${_area} ${_cor_id} Light ${_cor_id}: ${STATE[_ac_state]} AC: ${STATE[_light_state]}`);
    }
}