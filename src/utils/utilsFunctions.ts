export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c: string) {
      var r: number = (Math.random() * 16) | 0;
      var v: number = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
}
