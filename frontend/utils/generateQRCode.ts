export const generateQRCodeDataURL = async (data: string): Promise<string> => {
  const size = 256;
  const encodedData = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`;
};
