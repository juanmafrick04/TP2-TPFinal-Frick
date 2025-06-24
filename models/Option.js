export class Option {
    title
    value
    image
    blurhash
    constructor(title, value, image, blurhash = '') {
        this.title = title
        this.value = value
        this.image = image
        this.blurhash = blurhash
    }
}