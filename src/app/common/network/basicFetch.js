/* eslint-disable no-console */
export default async function basicFetch(url, options) {
  try {
    const response = await fetch(url, options);
    const content = (response.status === 200) ? await response.json() : null;
    return content;
  } catch (error) {
    console.warn(error);
    return null;
  }
}
