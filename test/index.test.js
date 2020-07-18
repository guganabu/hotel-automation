const assert = require('assert');
const expect = require("chai").expect;
const { floors, event } = require('../input.json');
const MotionController = require('../src/classes/motion-controller');
const MainCorridor = require('../src/classes/main-corridor');
const SubCorridor = require('../src/classes/sub-corridor');

const motionController = new MotionController(floors);

describe('Configure Infra', function () {
    motionController.configureInfra();
    it('Infra should be created for all floors', function (){
        assert.equal(floors.length, motionController.infra.length);
    });
});

 describe('Default State Test', function () {
    const floor1 = motionController.infra.find((floor) => floor.id === 1);
    const floor2 = motionController.infra.find((floor) => floor.id === 2);
    it('Floor 1, Main Corridor 1, Light should be ON', function () {
        const mainCorridor1 = floor1.mainCorridors.find((mainCorridor) => mainCorridor.id === 1);
        assert.equal(1, mainCorridor1.controller.getSate('light'));
    });

    it('Floor 1, Sub Corridor 1, Light should be OFF', function () {
        const subCorridor1 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 1);
        assert.equal(0, subCorridor1.controller.getSate('light'));
    });

    it('Floor 2, Sub Corridor 2, AC should be ON', function () {
        const subCorridor2 = floor2.subCorridors.find((subCorridor) => subCorridor.id === 2);
        assert.equal(1, subCorridor2.controller.getSate('ac'));
    });
 });


describe('Event Test, Motion: Floor 1, Sub Corridor 2', function () {
    motionController.consumeEvent(event.motion, function (infra) {
        const floor1 = infra.find((floor) => floor.id === 1);
        it('Floor 1, Sub Corridor 1, Light should be OFF', function () {
            const subCorridor1 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 1);
            console.log('subCorridor1', subCorridor1.controller)
            assert.equal(0, subCorridor1.controller.getSate('light'));
        });
    
        it('Floor 1, Sub Corridor 1, AC should be OFF', function () {
            const subCorridor1 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 1);
            console.log('subCorridor1', subCorridor1.controller)
            assert.equal(0, subCorridor1.controller.getSate('ac'));
        });

        it('Floor 1, Sub Corridor 2, Light should be ON', function () {
            const subCorridor2 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 2);
            assert.equal(1, subCorridor2.controller.getSate('light'));
        });

        it('Floor 1, Sub Corridor 2, AC should be ON', function () {
            const subCorridor2 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 2);
            assert.equal(1, subCorridor2.controller.getSate('ac'));
        });
    });
        
    // })
})

describe('Event Test, Idle: Floor 1, Sub Corridor 2', function () {
    motionController.consumeEvent(event.idle, function () {
    });
        const floor1 = motionController.infra.find((floor) => floor.id === 1);
        it('Floor 1, Sub Corridor 1, Light should be OFF', function () {
            const subCorridor1 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 1);
            assert.equal(0, subCorridor1.controller.getSate('light'));
        });
    
        it('Floor 1, Sub Corridor 1, AC should be ON', function () {
            const subCorridor1 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 1);
            assert.equal(1, subCorridor1.controller.getSate('ac'));
        });

        it('Floor 1, Sub Corridor 2, Light should be OFF', function () {
            const subCorridor2 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 2);
            assert.equal(0, subCorridor2.controller.getSate('light'));
        });

        it('Floor 1, Sub Corridor 2, AC should be ON', function () {
            const subCorridor2 = floor1.subCorridors.find((subCorridor) => subCorridor.id === 2);
            assert.equal(1, subCorridor2.controller.getSate('ac'));
        });
    // })
})