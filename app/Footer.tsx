import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-slate-400 my-5 mb-9 text-md w-[375px] md:w-[720px] text-center">
      © {currentYear} Utsav Joshi All Rights Reserved -- utsavjoshi602@gmail.com
    </div>
  );
};

export default Footer;
