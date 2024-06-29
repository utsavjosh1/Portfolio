/**
 * Renders the footer of the website.
 *
 * @returns {React.ReactElement} The rendered footer component.
 */
const Footer: React.FC = (): React.ReactElement => {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer
      className="flex flex-col md:flex-row text-slate-100 bg-slate-800 mx-5 opacity-80 w-[90%] h-auto md:h-[10%] rounded-lg items-center justify-center p-4 md:p-2"
    >
      <span className="text-center md:text-left">
        Utsav Joshi © {currentYear} All Rights Reserved
      </span>
      <span className="text-center md:text-left md:ml-2 mt-2 md:mt-0">
        utsavjoshi602@gmail.com
      </span>
    </footer>
  );
};

export default Footer;
