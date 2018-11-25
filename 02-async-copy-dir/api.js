const fs = require('fs');
const path = require('path');
const colors = require('colors');

// Формирование массива из названий содержимого директории
const getListPath = async (pathDir, filelist) => {
  if (!filelist) filelist = [];

  const files = await new Promise((res, rej) => {
    fs.readdir(pathDir, (err, files) =>
      !err ? res(files) : rej('Ошибка доступа в директорию'),
    );
  });

  await Promise.all(
    files.map(async file => {
      const filePath = path.join(pathDir, file);

      return await new Promise(res => {
        fs.stat(filePath, (err, stat) =>
          !err ? res(stat) : rej('Ошибка чтения файла: ', err),
        );
      }).then(async stat => {
        fileListItem = {
          type: stat.isDirectory() ? 'dir' : 'file',
          name: file,
          path: pathDir,
          pathFile: path.join(pathDir, file),
        };

        filelist.push(fileListItem);
        if (stat.isDirectory()) {
          filelist = await getListPath(filePath, filelist);
        }
      });
    }),
  );

  return filelist;
};

// Копирование файлов в папки с названием по первому символу.
const copyFilesSortDir = async (filesList, targetPathDir) => {
  if (!fs.existsSync(targetPathDir)) {
    fs.mkdirSync(targetPathDir);
  } else {
    // clearDir(targetPathDir);
    return;
  }

  await Promise.all(
    filesList.map(async file => {
      if (file.type === 'file') {
        const firstSymbol = file.name[0];
        const targetDir = path.join(targetPathDir, firstSymbol.toUpperCase());

        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir);
        }
        await new Promise((res, rej) => {
          fs.link(file.pathFile, path.join(targetDir, file.name), err =>
            !err ? res() : rej('Ошибка при копировании файла'),
          );
        });
      }
    }),
  );
};

const removeFiles = async (listPaths = [], typeFile) => {
  await Promise.all(
    listPaths.map(async file => {
      if (file.type === 'file' && typeFile == 'file') {
        await fs.unlink(file.pathFile, err => {
          if (err) return 'Ошибка при удалении внутреннего каталога';
        });
      } else if (file.type === 'dir' && typeFile == 'dir') {
        await fs.rmdir(file.pathFile, err => {
          if (err) return 'Ошибка при удалении внутреннего каталога';
        });
      }
    }),
  );
};

exports.newCollectionSort = async (
  isRemoveDir,
  collectionPath,
  targetPathDir,
) => {
  try {
    if (!fs.existsSync(collectionPath)) {
      console.log(colors.green(`\n Упс! Коллекция не обнаружена \n`));
      return;
    }
    const filesList = await getListPath(collectionPath);

    await copyFilesSortDir(filesList, targetPathDir);
    await removeFiles(filesList, 'file');
    await removeFiles(filesList, 'dir');
    if (isRemoveDir) {
      await fs.rmdir(collectionPath, err => {});
      console.log(
        colors.green(
          `\nГотово! Все файлы сложены в новую коллекцию, а иcходная папка удалена\n`,
        ),
      );
      return;
    }
    console.log(
      colors.green('\nГотово! Все файлы сложены в новую коллекцию.\n '),
    );
  } catch (err) {
    console.log(colors.red(err));
  }
};
