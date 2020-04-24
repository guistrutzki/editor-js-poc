import ToolboxIcon from '../image-text.svg';
import './styles.css';

class ImageWithText {
  constructor({data, config, api}) {
    this.api = api;
    this._data = {};
    this._element = this.drawView();

    this.onKeyUp = this.onKeyUp.bind(this);
    this._data = data;
  }

  get data() {
    let image = this._element.firstChild.firstChild;
    let text = this._element.lastChild.lastChild.textContent;

    this._data.imageUrl = image.src;
    this._data.text = text;

    return this._data;
  }

  drawView() {
    // Block Container 
    let div = document.createElement('div');
    div.classList.add('container');

    // Image Container
    let imageWrapper = document.createElement('div');
    imageWrapper.classList.add('imageContainer');

    // Image
    let imageEl = document.createElement('img');
    imageEl.src = 'http://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-6.jpg'

    //Image Input
    let imageInputEl = document.createElement('input');
    imageInputEl.type = 'file';


    //Listeners
    imageEl.addEventListener('click', () => imageInputEl.click());

    imageInputEl.addEventListener('change', function() {
      if (this.files.length > 0) {
        imageEl.src = URL.createObjectURL(this.files[0]);
        imageEl.onload = imageIsLoaded;
  
        this._data = {...this._data, imageUrl: imageEl.src}
      }
    })

    function imageIsLoaded() {
      console.log('loaded');
    }

    // Text Container
    let textWrapper = document.createElement('div');
    textWrapper.classList.add('textContainer');

    // TextInput
    let textInputEl = document.createElement('div');
    textInputEl.contentEditable = true;
    textInputEl.classList.add(['ce-paragraph', 'cdx-block']);

    textInputEl.addEventListener('keyup', (event) => {
      this.onKeyUp(event)
    });


    imageWrapper.appendChild(imageEl)
    textWrapper.appendChild(textInputEl)

    div.appendChild(imageWrapper);
    div.appendChild(textWrapper);

    return div;
  }

  onKeyUp(e) {
    if (e.code !== 'Backspace' && e.code !== 'Delete') {
      return;
    }

    const {textContent} = this._element.lastChild.lastChild.textContent;

    if (textContent === '') {
      this._element.lastChild.lastChild.textContent.innerHTML = '';
    }
  }

  render() {
    return this._element;
  }

  save() {
    console.log(this.data, 'data')
    return this.data;
  }

  static get toolbox() {
    return {
      icon: `<img src=${ToolboxIcon} style="width: 20px; height: 20px;"/>`,
      title: 'Image with Text'
    };
  }
}

export default ImageWithText;