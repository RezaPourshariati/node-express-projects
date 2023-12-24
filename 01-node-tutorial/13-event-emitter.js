// get back the class
// if you want custom extend from class
// otherwise just for emitting and handling events create instance


const EventEmitter = require('events'); // now, EventEmitter is a class. So we have to create new instance of that.

const customEmitter = new EventEmitter(); // creating an instance of class EventEmitter

// on and emit methods     on --> Listen for an event    emit --> emit an event
// keep track of the order
// additional arguments
// built-in modules utilize it

customEmitter.on('response', (name, id) => { // arguments are optional
    console.log(`data received user ${name} with id:${id}`);
});

customEmitter.on('response', () => {
    console.log('some other logic here');
});

// As you can see, we can have as many methods we would want.


customEmitter.emit('response', 'john', 34); // eventName needs to match with previous customEmitter.on()
// this emit() function, emit an event that we set before it with the same eventName.
// NOTE: order of emitter and listener matters. listeners should be first and Emitters should be after of them.