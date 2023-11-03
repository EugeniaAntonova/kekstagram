import { photosGallery } from './data.js';
import { renderPictures } from './pictures.js';
import { modalControl } from './user-form.js';

renderPictures(photosGallery());
modalControl();
