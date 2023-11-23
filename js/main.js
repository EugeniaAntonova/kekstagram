// import { photosGallery } from './data.js';
import { renderPictures } from './pictures.js';
import { modalControl } from './user-form.js';
import { getData, onLoadFail } from './api.js';

getData(renderPictures, onLoadFail);
modalControl();
