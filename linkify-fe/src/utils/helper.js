// Lấy hostname từ URL (vd: "https://google.com" -> "google.com")
const getTitleFromUrl = (url) => {
  try {
    // Tự động thêm https:// nếu chưa có
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname;
  } catch {
    // Trả về URL gốc nếu không hợp lệ
    return url;
  }
};

// Export các helper functions
export const Helper = {
  getTitleFromUrl,
};
