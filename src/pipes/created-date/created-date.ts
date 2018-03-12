import { Pipe, PipeTransform } from '@angular/core';

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

  millisecondDifference: any;

  transform(value: string) {
    let displayDate: string;

    let currentDate = new Date(Date());
    let currentYearString = currentDate.getFullYear().toString();

    let createdDate = new Date(value);
    let createdDayString = createdDate.getDate().toString();
    let createdMonthString = this.monthNames[createdDate.getMonth()].toString(); // convert short month name to full month name
    let createdYearString = createdDate.getFullYear().toString();

    let millisecondDifference = currentDate.getTime() - createdDate.getTime();
    this.millisecondDifference = millisecondDifference;

    if (millisecondDifference < this.secondToMillisecond) {
      displayDate = 'Just now';
    }

    if (millisecondDifference >= this.secondToMillisecond && millisecondDifference < this.minuteToMillisecond) {
      displayDate = this.getDisplayDate(1000, 'second', 'seconds');
    }

    if (millisecondDifference >= this.minuteToMillisecond && millisecondDifference < this.hourToMillisecond) {
      displayDate = this.getDisplayDate(60000, 'minute', 'minutes');
    }

    if (millisecondDifference >= this.hourToMillisecond && millisecondDifference < this.dayToMillisecond) {
      displayDate = this.getDisplayDate(3600000, 'hour', 'hours');
    }

    if (millisecondDifference >= this.dayToMillisecond && millisecondDifference < this.weekToMillisecond) {
      displayDate = this.getDisplayDate(86400000, 'day', 'days');
    }

    if (millisecondDifference >= this.weekToMillisecond) {
      if (currentYearString == createdYearString) {
        displayDate = createdMonthString + ' ' + createdDayString;
      } else {
        displayDate = createdMonthString + ' ' + createdDayString + ', ' + createdYearString;
      }
    }

    return displayDate.toUpperCase();
  }

  getDisplayDate(dividend: number, singular: string, plural: string) {
    var convertedAndRoundedResult = Math.floor(this.millisecondDifference/dividend);
    if (convertedAndRoundedResult == 1) {
      return convertedAndRoundedResult + ' ' + singular + ' ago';
    } else {
      return convertedAndRoundedResult + ' ' + plural + ' ago';
    }
  }
}
