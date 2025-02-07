import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter(Boolean);

  // Verifica se o último item é um número e o remove
  if (/^\d+$/.test(pathnames[pathnames.length - 1])) {
    pathnames = pathnames.slice(0, pathnames.length - 1);
  }

  // Função para formatar o texto corretamente
  const formatText = (text: string) => {
    return text.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <nav className="flex h-10 bg-gray-50">
      <ul className="flex items-center gap-x-1 text-sm font-normal text-gray-600">
        <li className="flex size-5 items-center justify-center">
          <i className="material-icons text-icon text-xl">home</i>
        </li>

        <li className="text-icon group hover:text-secondary relative cursor-pointer">
          <span className="bg-secondary absolute bottom-0 left-1 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
          / Cadastros
        </li>

        <Link to="/clientes">
          <li className="text-icon group hover:text-secondary relative cursor-pointer">
            <span className="bg-secondary absolute bottom-0 left-1 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
            / Clientes
          </li>
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <li key={to} className="flex items-center">
              <span className="text-icon">/</span>
              <span className="text-input ml-1">
                {decodeURIComponent(formatText(value))}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
