export function Error() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-500 to-orange-700 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-white">
          Error
        </h1>
        <p className="mt-4 text-xl text-white">
          Oops! Algo deu errado. Tente novamente mais tarde.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-semibold text-red-500 transition hover:bg-gray-100"
        >
          Voltar para Home
        </a>
      </div>
    </div>
  );
}
