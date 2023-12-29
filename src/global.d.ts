interface AnyObject {
  [key: string]: any;
}
interface Window {
  confetti: (obj: AnyObject) => void
}