const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-slate-100 bg-slate-800 p-5 my-5 mb-7 opacity-80 text-mg w-[350px] md:w-[720px] rounded-lg text-center">
      © {currentYear} Utsav Joshi All Rights Reserved -- utsavjoshi602@gmail.com
    </div>
  );
};

export default Footer;
