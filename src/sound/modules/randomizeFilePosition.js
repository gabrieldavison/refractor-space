export default function randomizeFilePosition({ max, min = 0 }) {
  this.filePosition = Math.floor(Math.random() * max) + min;
}
