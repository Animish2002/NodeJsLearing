const fs = require("fs");

//write file code how it is used
// fs.writeFileSync("./text.txt", "new text file");
// fs.writeFile("./test.txt", "Async file code", (err) => {});

//reads the files and prints what  is in the file
// console.log(fs.readFileSync("./text.txt", "utf-8")); //here utf-8 is the file encoding
//reads the files and prints what  is in the file in async way
// fs.readFile("./test.txt", "utf-8", (err, data) => {
//   console.log(data); //data is the output of the function)
// });

// fs.appendFileSync("./test.txt", "new changes with using fs.appendFileSync\n");
// fs.appendFile("./test.txt", "new line with with async\n", (err) => {}); //appends the data to the file in async way

// fs.stat("./test.txt", (err, data) => {
//   //here fs.stat is used to get stat of the file
//   console.log(data);
// });

// fs.copyFile("./text.txt", "./test.txt", (err) => {}); //this copys all the content from one file to another(text file to test file)
