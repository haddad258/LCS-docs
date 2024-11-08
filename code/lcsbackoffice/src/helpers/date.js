// dateHelper.js
import moment from 'moment';

export function formatDate(date) {
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    return null
  }
  return momentDate.format('YYYY-MM-DD HH:mm');
}

export function dateForm(date) {
  const momentDate = moment(date);
  if (!momentDate.isValid()) {
    return null;
  }

  const lang = localStorage.getItem('lang');

  if (lang === 'fr') {
    return momentDate.format('DD-MM-YYYY');
  } else {
    return momentDate.format('YYYY-MM-DD'); // Format par défaut
  }
}

export function calculateHoursDifference(date1, date2) {
  let dateObj1 = new Date(date1);
  let dateObj2 = new Date(date2);
  let diffInMilliseconds = dateObj2 - dateObj1;
  let diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  let roundedDiffInHours = Number(diffInHours.toFixed(2));
  return roundedDiffInHours;
}
export function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};