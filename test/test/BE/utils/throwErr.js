export default function throwErr(status, message) {
  !message && (message = "");
  !status && (status = 400);
  throw { status, message };
}
