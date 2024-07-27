class Rover {
   constructor() {
      this.position = 'position';
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   move(value) {
      if (this.mode === 'NORMAL') {
         this.position = value
         return {completed: true}
      } else {
         return {completed: false}
      }
   }

   statusCheck() {
      return {
         completed: true,
         roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
      }
   }

   modeChange(value) {
      this.mode = value
      return {completed: true}
   }

   receiveMessage(message) {
      let output = {
         message: message.name,
         results: []
      }
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'MOVE') {
            output.results.push(this.move(message.commands[i].value))
         } else if (message.commands[i].commandType === 'STATUS_CHECK') {
            output.results.push(this.statusCheck())
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            output.results.push(this.modeChange(message.commands[i].value))
         } else {
            throw Error("Invalid command");
         }
      }

      return output

   }

}

module.exports = Rover;