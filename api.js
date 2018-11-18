const fs = require('fs');
const path = require('path');
const colors = require('colors');

// Формирование массива из названий содержимого директории
const listContentDir = pathDir => {
  let results = [];

  if (!fs.existsSync(pathDir)) {
    return results;
  }

  const list = fs.readdirSync(pathDir);
  list.forEach(file => {
    const stat = fs.statSync(path.join(pathDir, file));
    let type = stat.isDirectory() ? 'dir' : 'file';
    results.push({
      type: type,
      name: file,
      path: pathDir,
      pathFile: path.join(pathDir, file)
    });
    if (stat && stat.isDirectory()) {
      results = results.concat(listContentDir(path.join(pathDir, file)));
    }
  });
  return results;
};

// Удаление содержимого директории.
// isRemoveDir: (boolean) — флаг для удаления исходной директории
const clearDir = (pathDir, isRemoveDir = false) => {
  if (fs.existsSync(pathDir)) {
    const lsDir = listContentDir(pathDir);

    // Удаляем все файлы во все директорииях
    lsDir.forEach(file => {
      if (file.type === 'file') {
        fs.unlinkSync(file.pathFile);
      }
    });

    // Удаляем все уже очищенные директории
    lsDir.reverse().forEach(file => {
      if (file.type === 'dir') {
        fs.rmdirSync(file.pathFile);
      }
    });

    // Удаляем исходную директорию (опционально)
    if (isRemoveDir) {
      fs.rmdirSync(pathDir);
    }
  }
};

// Копирование файлов в папки с названием по первому символу.
const copyFilesSortDir = (filesList = [], targetPathDir) => {
  if (!fs.existsSync(targetPathDir)) {
    fs.mkdirSync(targetPathDir);
  } else {
    clearDir(targetPathDir);
  }
  filesList.forEach(file => {
    if (file.type === 'file') {
      const firstSymbol = file.name[0];
      const targetDir = path.join(targetPathDir, firstSymbol.toUpperCase());

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
      }
      fs.linkSync(file.pathFile, path.join(targetDir, file.name));
    }
  });
};

exports.newCollectionSort = (
  isRemoveDir,
  collectionPath,
  targetPathDir
) => {
  try {
    if (!fs.existsSync(collectionPath)) {
      console.log(colors.green(`\n Упс! Коллекция не обнаружена \n`));
      return;
    }
    const filesList = listContentDir(collectionPath);

    copyFilesSortDir(filesList, targetPathDir);
    if (isRemoveDir) {
      clearDir(collectionPath, isRemoveDir);

      console.log(colors.green(`\nГотово! Все файлы сложены в новую коллекцию, а иcходная папка удалена\n`));
      return;
    }
    console.log(colors.green('\nГотово! Все файлы сложены в новую коллекцию.\n '));
  } catch (err) {
    console.error(err);
  }
};
