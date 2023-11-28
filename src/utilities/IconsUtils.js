import icon01d from '../assets/icons/01d.png';
import icon01n from '../assets/icons/01n.png';
import icon02d from '../assets/icons/02d.png';
import icon02n from '../assets/icons/02n.png';
import icon03d from '../assets/icons/03d.png';
import icon03n from '../assets/icons/03n.png';
import icon04d from '../assets/icons/04d.png';
import icon04n from '../assets/icons/04n.png';
import icon09d from '../assets/icons/09d.png';
import icon09n from '../assets/icons/09n.png';
import icon10d from '../assets/icons/10d.png';
import icon10n from '../assets/icons/10n.png';
import icon11d from '../assets/icons/11d.png';
import icon11n from '../assets/icons/11n.png';
import icon13d from '../assets/icons/13d.png';
import icon13n from '../assets/icons/13n.png';
import icon50d from '../assets/icons/50d.png';
import icon50n from '../assets/icons/50n.png';

const allWeatherIcons = {
  '01d.png': icon01d,
  '02d.png': icon02d,
  '03d.png': icon03d,
  '04d.png': icon04d,
  '09d.png': icon09d,
  '10d.png': icon10d,
  '11d.png': icon11d,
  '13d.png': icon13d,
  '50d.png': icon50d,
  '01n.png': icon01n,
  '02n.png': icon02n,
  '03n.png': icon03n,
  '04n.png': icon04n,
  '09n.png': icon09n,
  '10n.png': icon10n,
  '11n.png': icon11n,
  '13n.png': icon13n,
  '50n.png': icon50n,
  // add all other images here
};
export function weatherIcon(imageName) {

  const iconsKeys = Object.keys(allWeatherIcons);

  const iconsValues = Object.values(allWeatherIcons);
  const iconIndex = iconsKeys.indexOf(imageName);

  return iconsValues[iconIndex];
}
