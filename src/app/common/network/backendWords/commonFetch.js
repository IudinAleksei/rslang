export async function fetchUrl(url, options) {
  try {
    const response = await fetch(url, options);
    const content = (response.status === 200) ? await response.json() : null;
    return content;
  } catch (error) {
    console.warn(error);
    return null;
  }
}