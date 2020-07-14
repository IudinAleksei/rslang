import addErrorMessage from '../../utils/errorMessage';

export default async function fetchUrl(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.status !== 200) {
      addErrorMessage();
      return null;
    }
    const content = await response.json();
    return content;
  } catch (error) {
    addErrorMessage();
    return null;
  }
}
