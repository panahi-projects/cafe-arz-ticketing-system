const geistSans = {
  className: "mock-geist-sans",
  style: { fontFamily: "mock-geist-sans" },
  variable: "--font-geist-sans",
};

const geistMono = {
  className: "mock-geist-mono",
  style: { fontFamily: "mock-geist-mono" },
  variable: "--font-geist-mono",
};

module.exports = {
  Geist: () => geistSans,
  Geist_Mono: () => geistMono,
};
