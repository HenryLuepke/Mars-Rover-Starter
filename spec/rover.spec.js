const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover().position).toBe('position');
    expect(new Rover().mode).toBe('NORMAL');
    expect(new Rover().generatorWatts).toBe(110);
  })

  it("response returned by receiveMessage contains the name of the message", function() {
    let newMessage = new Message("name of message", [new Command("MOVE", 100)])
    expect(new Rover().receiveMessage(newMessage).message).toBe('name of message')
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let newMessage = new Message("name of message", [new Command("MOVE", 100), new Command("STATUS_CHECK")])
    expect(new Rover().receiveMessage(newMessage).results.length).toBe(2)
  })

  it("responds correctly to the status check command", function() {
    let newMessage = new Message("status check", [new Command("STATUS_CHECK")])
    let rover = new Rover()
    let status = rover.receiveMessage(newMessage).results[0].roverStatus
    expect(status).toEqual({mode: rover.mode, generatorWatts: rover.generatorWatts, position: rover.position})
  })

  it("responds correctly to the mode change command", function() {
    let newMessage = new Message("mode change", [new Command("MODE_CHANGE", "LOW_POWER")])
    let rover = new Rover()
    let roverOutput = rover.receiveMessage(newMessage)
    expect(roverOutput.results[0].completed).toBe(true)
    expect(rover.mode).toBe("LOW_POWER")
  })

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let newMessage = new Message("mode change and move attempt", [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 100)])
    let rover = new Rover()
    let roverOutput = rover.receiveMessage(newMessage)
    expect(roverOutput.results[1].completed).toBe(false)
    expect(rover.position).toBe('position')
  })

  it("responds with the position for the move command", function() {
    let moveMessage = new Message("move", [new Command("MOVE", 100)])
    let rover = new Rover()
    rover.receiveMessage(moveMessage) //ask about why I couldn't chain the recieve method in the initialization of the rover variable but I could in abover expect calls
    expect(rover.position).toBe(100)
  })

});
