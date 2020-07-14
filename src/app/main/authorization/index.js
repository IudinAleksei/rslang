import './sass/form.scss';
import showForm from './view/showForm';
import {
  formHandling,
  checkAuthorization,
} from './controls/control';

export default function authorization(nextPageFunction) {
  if (checkAuthorization()) {
    formHandling(nextPageFunction);
  } else {
    showForm();
    formHandling(nextPageFunction);
  }
}
