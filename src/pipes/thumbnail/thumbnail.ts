import { Pipe, PipeTransform } from '@angular/core';
import { ENV } from '@environment';

@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, size?: string) {
    if (size == null) {
      size = 'medium';
    }

    let filename = value.split(".")[0];

    switch(size) {
      case 'screenshot': {
        filename = `${filename}.png`;
        break;
      }

      case 'small': {
        filename = `${filename}-tn160.png`;
        break;
      }

      case 'medium': {
        filename = `${filename}-tn320.png`;
        break;
      }

      case 'large': {
        filename = `${filename}-tn640.png`;
        break;
      }

      default: {
        // Return medium size as default value
        filename = `${filename}-tn320.png`;
      }
    }

    return `${ENV.API_BASE_URL}/uploads/${filename}`;
  }
}
