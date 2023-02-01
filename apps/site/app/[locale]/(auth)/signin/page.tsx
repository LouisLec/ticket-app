import Link from "next/link";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <p>Sign in to your account to access your projects.</p>
      <div>
        <Link href="/signup">Create an account</Link>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
};
