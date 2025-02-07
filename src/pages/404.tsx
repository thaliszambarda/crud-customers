import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-white">
          404
        </h1>
        <p className="mt-4 text-xl text-white">
          Ops! A página que você procura não foi encontrada.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-semibold text-blue-500 transition hover:bg-gray-100"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
