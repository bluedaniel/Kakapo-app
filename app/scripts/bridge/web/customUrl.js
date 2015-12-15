import { newSoundClass } from '../../classes';

const Supported = [ 'mp3', 'opus', 'ogg', 'wav', 'aac', 'm4a', 'mp4', 'weba' ];

export function getCustomURL(data) {
  return new Promise((resolve, reject) => {
    const ext = /^([\w\-]+)/.exec(data.url.split('.').pop())[0];
    if (data.source !== 'file' && Supported.indexOf(ext) === -1) {
      return reject(new Error(`${data.url} must be one of ${Supported.join(', ')}`));
    }

    resolve({ ...newSoundClass, ... {
      file: data.url,
      img: data.icon,
      name: data.name,
      progress: 0,
      source: data.source,
      tags: ''
    } });
  });
}
