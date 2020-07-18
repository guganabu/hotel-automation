const {floors, event} = require('./input.json');
const MotionController  = require('./src/classes/motion-controller.js');


const motionController = new MotionController(floors);

motionController.configureInfra();

// Default or Initial state of the motion controller
console.log('DEFAULT STATE');
motionController.logState();

// Assuming an event is occured, state = motion
motionController.consumeEvent(event.motion, () => {
    console.log('Event: Motion');
    motionController.logState();
});

// Assuming an event is occured (1 min later), state = idle
motionController.consumeEvent(event.idle, () => {
    console.log('Event: Idle');
    motionController.logState();
});
