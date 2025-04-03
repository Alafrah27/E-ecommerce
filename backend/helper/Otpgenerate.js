const generateOTP = () => {
  const length = 6;
  const characters = "0123456789";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  const otp = Array.from(randomValues, (value) =>
    characters.charAt(value % characters.length)
  ).join("");

  return otp;
};

export default generateOTP;
