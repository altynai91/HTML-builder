const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


fs.writeFile('02-write-file/newfile.txt', '', function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Файл создан.');
  }
});

let questionRepeater = function() {
  rl.question('Какой текст вы хотите добавить в файл? ', function(answer) {
    if (answer !== 'exit') {
      fs.appendFile('02-write-file/newfile.txt', ` ${answer}`, function(err){
        if(err) {
          console.log(err);
        } else {
          console.log('Введите новый текст, чтобы дополнить файл или остановите запись нажатием `CTRL + c` / введением в консоль `exit`'); 
        }    
      });
      questionRepeater();
    }
    else if (answer === 'exit') {
      console.log('\nСпасибо за проверку, пока!');
      rl.close();
    }
  });
};
questionRepeater();

process.stdin.on('keypress', function(chunk, key) {
  if(key && key.name === 'c' && key.ctrl) {
    console.log('\nСпасибо за проверку, пока!');
    process.exit();
  }
});