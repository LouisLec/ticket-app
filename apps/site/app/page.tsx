import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginForm } from "./loginFormProps";

const LoginPage = () => {
  return (
    <>
      <main className="container">
        <div className="max-w-lg mx-auto rounded">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Connexion</h1>
            <p className="text-sm text-gray-500">
              Connectez-vous à votre compte pour accéder à vos projets.
            </p>

            <LoginForm />
            <div className="flex items-center justify-between mt-4">
              <Link href="/signup" className="text-sm text-gray-500">
                Créer un compte
              </Link>
              <Link href="/forgot-password" className="text-sm text-gray-500">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
