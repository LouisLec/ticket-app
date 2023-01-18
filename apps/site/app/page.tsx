import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <main className="container">
        <h1 className="">Login</h1>
        <Link href={"/organizations"}>Login</Link>
      </main>
    </>
  );
};

export default LoginPage;
