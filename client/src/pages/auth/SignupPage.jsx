import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import SignupForm from '../../components/auth/SignupForm';

/**
 * SignupPage component
 * 
 * WHY it exists:
 * Serves as the Composition Root for the Signup view.
 * Composes AuthLayout, AuthCard, AuthHeader, and SignupForm.
 * 
 * DESIGN SPEC:
 * Fully matches the split-screen layout from the mockup with clean container structure,
 * brand headers, input fields, checkboxes, submit buttons, dividers, and redirect pathways.
 */
export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader />
        
        {/* Form panel spacing container */}
        <div className="mt-8">
          <SignupForm />
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
