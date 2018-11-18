exports.run = [
  {
    type: 'list',
    name: 'runSort',
    message: 'Хочешь разложить файлы каталога в по алфавиту?',
    choices: ['Да', 'Нет']
  },
  {
    type: 'list',
    name: 'isSourcePath',
    message: 'Какой возьмем каталог?',
    choices: ['Уже заготовленный', 'Ввести свой путь'],
    when: function (answers) {
      return answers.runSort === 'Да';
    }
  },
  {
    type: 'input',
    name: 'sourcePath',
    message: 'Введите адресс своего каталога:',
    when: function (answers) {
      return answers.isSourcePath === 'Ввести свой путь';
    }
  },
  {
    type: 'list',
    name: 'isOutPath',
    message: 'Где расположить файлы?',
    choices: ['В корне данной директории', 'Ввести свой путь'],
    when: function (answers) {
      return answers.runSort === 'Да';
    }
  },
  {
    type: 'input',
    name: 'outPath',
    message: 'Введите путь каталога, в котором расположить отсортированные файлы:',
    when: function (answers) {
      return answers.isOutPath === 'Ввести свой путь';
    }
  },
  {
    type: 'list',
    name: 'removeDir',
    message: 'Удалить после сортировки исходный каталог?',
    choices: ['Не удалять', 'Удалить'],
    when: function (answers) {
      return answers.runSort === 'Да';
    }
  }
];

exports.removeDir = [
];
