const program = require('commander');
const colors = require('colors');
const inquirer = require('inquirer');
const questions = require('./questions');
const api = require('./api');

program
  .command('start')
  .alias('s')
  .description('Запуск диалогово окна')
  .action(() => {
    run();
  });

program
  .version('0.1.0')
  .command('create')
  .alias('c')
  .description('Запустить копирование')
  .option('-s, --source [value]', 'Путь к исходной папке', './collections')
  .option('-o, --output [value]', 'Путь к выходному каталогу', './sortCollections')
  .option('-r, --remove', 'Удалить исзходную папку')
  .action((args) => {
    api.newCollectionSort(args.remove, args.source, args.output);
  });

const run = () => {
  console.log('\n', colors.green('Приветствую тебя, мой друг!', '\n'));

  inquirer.prompt(questions.run).then(answers => {
    if (answers.runSort === 'Да') {
      let isRemove = false;
      let sourcePathDir = './collections';
      let outPathDir = './sortCollections';

      answers.removeDir === 'Удалить' && (isRemove = true);
      answers.isSourcePath === 'Ввести свой путь' && (sourcePathDir = answers.sourcePath);
      answers.isOutPath === 'Ввести свой путь' && (outPathDir = answers.outPath);

      api.newCollectionSort(isRemove, sourcePathDir, outPathDir);
    } else {
      console.log('\n', colors.green('Ну как хочешь!', '\n'));
    }
  });
};

program.parse(process.argv);
