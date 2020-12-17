export default function randomValueSwitcher({
  low,
  high,
  callback,
  probability,
}) {
  Math.random() > probability ? callback(high) : callback(low);
}
