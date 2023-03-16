import { enableBodyScroll, disableBodyScroll } from './body-scroll-lock.js'
//import {medias} from '../pages/photographer'
const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".mp4"]'))
/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images de la lightbox
 * @property {string} url Image actuellement affichée
 **/


class Lightbox {

  static init() {

    const gallery = links.map(link => link.getAttribute('href'))
    links.forEach(link => link.addEventListener('click', e => {
      e.preventDefault()
      new Lightbox(e.currentTarget.getAttribute('href'), gallery)
    }))
  }

  /**
   * @param {string} url URL de l'image
   * @param {string[]} images Chemins des images de la lightbox
   */
  constructor(url, images) {
    this.element = this.buildDOM(url)
    this.images = images
    this.loadImage(url)
    this.onKeyUp = this.onKeyUp.bind(this)
    document.body.appendChild(this.element)
    disableBodyScroll(this.element)
    document.addEventListener('keyup', this.onKeyUp)
  }

  /**
   * @param {string} url URL de l'image
   */
  loadImage(url) {
    this.url = null
    console.log(url.substr(-3, 3))
    if (url.substr(-3, 3) != "mp4"){
      //medias.image
      const picture = new Image()
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = ''
      this.url = url;
      container.appendChild(picture);
      picture.src = url;
    } else {
      const picture = document.createElement('video')
      let videoSource = document.createElement('source');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = ''
      this.url = url;
      videoSource.setAttribute("src", url)
      videoSource.setAttribute("type", "video/mp4")
      picture.controls = true ;
      container.appendChild(picture);
      picture.appendChild(videoSource)
      //videoSource.src = url;
    }
    /*const image = new Image()
    const image = new Image()
    const container = this.element.querySelector('.lightbox__container');
    container.innerHTML = ''
    this.url = url;
    container.appendChild(image);
    image.src = url;
    */
  }



  /**
   * @param {KeyboardEvent} e 
   */
  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e)
    } else if (e.key === 'ArrowLeft') {
      this.prev(e)
    } else if (e.key === 'ArrowRight') {
      this.next(e)
    }
    
  }

  /**
   * Ferme la ligthbox
   * @param {MouseEvent|KeyboardEvent} e 
   */
  close(e) {
    e.preventDefault()
    this.element.classList.add('fadeOut')
    enableBodyScroll(this.element)
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element)
    }, 500)
    document.removeEventListener('keyup', this.onKeyUp)
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e 
   */
  next(e) {
    e.preventDefault()
    let i = this.images.findIndex(picture => picture === this.url)
    if (i === this.images.length - 1) {
      i = -1
    }
    this.loadImage(this.images[i + 1])
  }

  /**
   * @param {MouseEvent|KeyboardEvent} e 
   */
  prev(e) {
    e.preventDefault()
    let i = this.images.findIndex(picture => picture === this.url)
    if (i === 0) {
      i = this.images.length
    }
    this.loadImage(this.images[i - 1])
  }

  /**
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDOM(url) {
    const dom = document.createElement('div')
    dom.classList.add('lightbox')
    dom.innerHTML = `<button class="lightbox__close"></button>
        <button class="lightbox__next"></button>
        <button class="lightbox__prev"></button>
        <div class="lightbox__container"></div>`
    dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
    dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
    dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
    return dom
  }

}

Lightbox.init()