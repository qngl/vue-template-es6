import _ from 'lodash';

export function readFile(file) {
  const fileItem = {
    name: file.name
  };
  const fileName = file.name.toLowerCase();
  return new Promise(resolve => {
    if (_.endsWith(fileName, '.png') || _.endsWith(fileName, '.jpg') || _.endsWith(fileName, '.jpeg')) {
      const reader = new FileReader();
      if (FileReader.prototype.readAsDataURL) {
        reader.onload = function(readerEvt) {
          const dataURL = readerEvt.target.result;
          fileItem['base64Url'] = dataURL;
          resolve(fileItem);
        };
        reader.readAsDataURL(file);
      }
    }
  });
}
