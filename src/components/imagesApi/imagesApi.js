import axios from 'axios';
const KEY = '21803950-62f4c86011510fd15fe85c0d2';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const fetchHits = async ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};
const exportObject = { fetchHits };
export default exportObject;
