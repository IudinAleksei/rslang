export default async function getMedia(path) {
  const responce = await fetch(`https://raw.githubusercontent.com/IudinAleksei/rslang-data/master/${path}`);

  return responce;
}
