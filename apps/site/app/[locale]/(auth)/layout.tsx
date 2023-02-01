export const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* header */}
      <header className="bg-red-200 border border-red-500">Auth</header>
      <div className="container flex-1">{children}</div>
      {/* footer */}
    </div>
  );
};
