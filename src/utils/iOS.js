// export default function iOS() {
//   return (
//     [
//       "iPad Simulator",
//       "iPhone Simulator",
//       "iPod Simulator",
//       "iPad",
//       "iPhone",
//       "iPod",
//     ].includes(navigator.platform) ||
//     // iPad on iOS 13 detection
//     (navigator.userAgent.includes("Mac") && "ontouchend" in document)
//   );
// }

export default function iOS() {
  return !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
}
