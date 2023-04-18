import axios from 'axios';
import parse from 'html-react-parser';

export default async function parseBookHHTML(url?: string) {
  console.log('parse html', url);
  if (!url) {
    return false;
  }
  try {
    const response = await axios.get(url);
    const htmlData = await response.data;
    console.log(parse(htmlData));
    return true;
  } catch(error) {
    console.error(error);
    return error;
  }
};