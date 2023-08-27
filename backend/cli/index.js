const fs = require("fs"); // for style, put this at the top of your file separate from the other stuff)
const yargs = require("yargs");
const chalk = require("chalk");
const loadTodos = () => {
    try {
        // read the file data.json in root directory and assign it to dataBuffer
        // dataBuffer will contain binary data reading from the file
        const dataBuffer = fs.readFileSync("db.json");
        // convert binary data to string (json object)
        const dataJSON = dataBuffer.toString();
        // parsing a json object to js object so we can work with
        return JSON.parse(dataJSON);
    } catch (e) {
        // Handle error, if something goes wrong, let's just return an empty array.
        console.error(e);
        return [];
    }
};
const a = loadTodos()
const saveTodos = arr => {
    // convert js object to json object (string)
    const dataJSON = JSON.stringify(arr);
    // use fs.writeFileSync to write dataJSON to data.json file
    fs.writeFileSync("db.json", dataJSON);
  };
  yargs.command({
      command: "add",
      describe: "Add a new todo",
      builder: {
        todo: {
          describe: "Todo content",
          demandOption: true,
          type: "string"
        },
        complete: {
          describe: "Todo status",
          demandOption: false,
          type: "boolean",
          default: false
        }
      },
      handler: function(argv) {
        a.push({todo:argv.todo,complete:argv.complete});
      }
  });

const sayHello = () => {
    
    console.log('hello')
    console.log(process.argv);
    if (process.argv[2] === "add") {
        yargs.parse()
        
        
        saveTodos(a)
        
    } else if (process.argv[2] === "list") {
      a.map((t)=>{
        if(t.complete == false){
        chalk.red(t)
        }
      })
      console.log(a)
    } else {
        console.log("I don't understand your command");
    }
}
sayHello()
const say = ( )=>{
  console.log(chalk.green("HIii"))
}
say()