import AuthLayout from "../../components/Auth/Authlayout";
import LoginForm from "../../components/Auth/Loginform";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to access your Smart CRM account."
      type="login"
    >
      <LoginForm />
    </AuthLayout>
  );
}
