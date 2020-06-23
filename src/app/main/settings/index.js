import './sass/style.scss';
import addSettingsHtml from './view/view';
import sliderSettingsPageHandling from './controls/controls';

export default function renderSettings() {
  addSettingsHtml();
  sliderSettingsPageHandling();
}
