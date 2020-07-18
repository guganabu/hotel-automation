const MainCorridor = require('./main-corridor');
const SubCorridor = require('./sub-corridor');
const EventLogger = require('./logger');

module.exports = class MotionController {
    constructor(floors) {
        this.floors = floors;
        this.eventLogger = new EventLogger();
        this.infra = [];
    }

    /**
     * @function configureInfra
     * Method to configure the infra ctrls
     */
    configureInfra() {
        this.infra = this.floors.map((floor) => { 
            const floorInfra = {
                id: floor.id,
                mainCorridors: [],
                subCorridors: []
            };
            for (let mc = 1; mc <= floor.main_corridors; mc++) {
                floorInfra.mainCorridors.push({
                    id: mc,
                    controller: new MainCorridor()
                });
            }

            for (let sc = 1; sc <= floor.sub_corridors; sc++) {
                floorInfra.subCorridors.push({
                    id: sc,
                    controller: new SubCorridor()
                });
            }
            return floorInfra;
        });
    }

    /**
     * @function consumeEvent
     * @param {Object} event eventObject
     * @param {Function} next callback method
     * Event handler method of event {motion | idle}
     */
    consumeEvent(event, next) {
        const floorInfra = this.infra.find((floor) => floor.id === event.floor);
            floorInfra.subCorridors.map((subCorridor) => {
                if (subCorridor.id === event.sub_corridor) {
                    subCorridor.controller.setState('light', event.state === 'motion' ? 1 : 0);
                } else {
                    subCorridor.controller.setState('ac', event.state !== 'motion' ? 1 : 0);
                }
            });
        next();
    }

    /**
     * @function logState
     * Method to log current state of devices
     */
    logState() {
        this.infra.map((floor) => {
            console.log(`Floor ${floor.id}`);
            floor.mainCorridors.map((mainCorridor) => {
                this.eventLogger.logState('Main Corridor', mainCorridor.id, mainCorridor.controller.getSate('light'), mainCorridor.controller.getSate('ac'));
            });

            floor.subCorridors.map((subCorridor) => {
                this.eventLogger.logState('Sub Corridor', subCorridor.id, subCorridor.controller.getSate('light'), subCorridor.controller.getSate('ac'));
            })
        })
    }

    // handleDevicesState() {

    //     this.floors.map((floor) => {
    //         console.log(`Floor ${floor.id}`);
    //         const isMotionDetected = this._event ? this._event.motion.floor === floor.id : false;
    //         for (let mainCor = 1; mainCor <= floor.main_corridors; mainCor++) {
    //             const mainCorridor = new MainCorridor();
    //             this.eventLogger.logState('Main', mainCor, mainCorridor.getSate('ac'), mainCorridor.getSate('light'));
    //             for (let subCor = 1; subCor <= floor.sub_corridors; subCor++) {
    //                 const subCorridor = new SubCorridor(subCor);
    //                 if (isMotionDetected ) {
    //                     if (subCor === this._event.motion.sub_corridor) {
    //                         subCorridor.activateDevices();
    //                     } else {
    //                         subCorridor.setState('ac', 0);
    //                     }
    //                 } else {
    //                     subCorridor.setState('light', 0);
    //                 }
    //                 this.subCorridors.push(subCorridor);
    //                 this.eventLogger.logState('Sub', subCor, subCorridor.getSate('light'), subCorridor.getSate('ac'));
    //             }
    //         }
    //     })
    //     console.log('sub cors', this.subCorridors)
    // }
}