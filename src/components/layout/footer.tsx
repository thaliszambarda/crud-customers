export const Footer = () => {
  return (
    <footer className="flex min-h-10 flex-wrap items-center justify-center gap-x-8 gap-y-2 px-8 md:justify-between">
      <div className="flex h-6 items-center justify-center gap-6">
        <img
          src="assets/logo-engie-blue.svg"
          alt="engie logo"
          className="mb-1 h-5"
        />
        <div className="flex h-6 gap-4">
          <img src="assets/linkedin.svg" alt="linkedin logo" />
          <img src="assets/facebook.svg" alt="facebook logo" />
          <img src="assets/x.svg" alt="x logo" />
          <img src="assets/instagram.svg" alt="instagram logo" />
        </div>
      </div>
      <p className="text-icon text-xs md:text-sm">
        SMART 4.0 - V.4.123.081 | © 2024 ENGIE • All Rights Reserved
      </p>
    </footer>
  );
};
