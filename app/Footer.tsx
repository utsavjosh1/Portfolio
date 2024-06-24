const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-slate-100 bg-slate-800 p-5 my-5 mb-7 opacity-80 text-mg md:w-[88%] rounded-lg text-center items-center justify-center">
      Utsav Joshi © {currentYear} All Rights Reserved utsavjoshi602@gmail.com
    </div>
  );
};

export default Footer;
