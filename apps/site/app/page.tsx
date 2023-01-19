import Link from "next/link";
import jo from "../../../data/schema.json";

const LoginPage = () => {
  return (
    <>
      <main className="container">
        <h1 className="">Login</h1>
        <Link href={"/organizations"}>Login</Link>
      </main>
      {jo.data.__schema.types?.map(x => {
        return (
          <div key={x.name}>
            <h2>{x.name}</h2>
            <p>{x.description}</p>
            <ul>
              {x.fields?.map(y => {
                return (
                  <li key={y.name}>
                    <h3>{y.name}</h3>
                    <p>{y.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default LoginPage;
