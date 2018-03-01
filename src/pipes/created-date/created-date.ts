import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CreatedDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'createdDate',
})
export class CreatedDatePipe implements PipeTransform {
  secondToMillisecond = 1000;
  minuteToMillisecond = 60000;
  hourToMillisecond = 3600000;
  dayToMillisecond = 86400000;
  weekToMillisecond = 604800000;

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  transform(value: string) {
    let displayDate: string;

    let currentDate = new Date(Date());
    let currentYearString = currentDate.getFullYear().toString();

    let createdDate = new Date(value);
    let createdDayString = createdDate.getDate().toString();
    let createdMonthString = this.monthNames[createdDate.getMonth()].toString(); // convert short month names to full month names
    let createdYearString = createdDate.getFullYear().toString();

    let millisecondDifference = currentDate.getTime() - createdDate.getTime();

    if (millisecondDifference < this.secondToMillisecond) {
      displayDate = 'Just now';
    }

    if (millisecondDifference >= this.secondToMillisecond && millisecondDifference < this.minuteToMillisecond) {
      if (Math.floor(millisecondDifference/1000) == 1) {
        displayDate = Math.floor(millisecondDifference/1000).toString() + ' second ago';
      } else {displayDate = Math.floor(millisecondDifference/1000).toString() + ' seconds ago';}
    }

    if (millisecondDifference >= this.minuteToMillisecond && millisecondDifference < this.hourToMillisecond) {
      if (Math.floor(millisecondDifference/60000) == 1) {
        displayDate = Math.floor(millisecondDifference/60000).toString() + ' minute ago';
      } else {
        displayDate = Math.floor(millisecondDifference/60000).toString() + ' minutes ago';
      }
    }

    if (millisecondDifference >= this.hourToMillisecond && millisecondDifference < this.dayToMillisecond) {
      if (Math.floor(millisecondDifference/3600000) == 1) {
        displayDate = Math.floor(millisecondDifference/3600000).toString() + ' hour ago';
      } else {
        displayDate = Math.floor(millisecondDifference/3600000).toString() + ' hours ago';
      }
    }

    if (millisecondDifference >= this.dayToMillisecond && millisecondDifference < this.weekToMillisecond) {
      if (Math.floor(millisecondDifference/86400000) == 1) {
        displayDate = Math.floor(millisecondDifference/86400000).toString() + ' day ago';
      } else {
        displayDate = Math.floor(millisecondDifference/86400000).toString() + ' days ago';
      }
    }

    if (millisecondDifference >= this.weekToMillisecond) {
      if (currentYearString == createdYearString) {
        displayDate = `${createdMonthString} ${createdDayString}`;
      } else {
        displayDate = `${createdMonthString} ${createdDayString}, ${createdYearString}`;
      }
    }

    return displayDate.toUpperCase();
  }
}
