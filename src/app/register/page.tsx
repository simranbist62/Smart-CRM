import AuthLayout from "../../components/Auth/Authlayout";
import RegisterForm from "../../components/Auth/registerform";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      description="Create your Smart CRM account to get started."
      type="register"
    >
      <RegisterForm />
    </AuthLayout>
  );
}