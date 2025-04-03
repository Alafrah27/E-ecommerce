export function generateOrderId() {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 7;
  const randomValue = new Uint8Array(length);
  crypto.getRandomValues(randomValue);
  let orderID = "";
  for (let i = 0; i < length; i++) {
    orderID += charset.charAt(randomValue[i] % charset.length);
  }
  return orderID;
}
