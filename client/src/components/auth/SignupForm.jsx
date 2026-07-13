import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import TermsCheckbox from './TermsCheckbox';
import SubmitButton from './SubmitButton';

// ─── Zod Schema definition ───
const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: 'Full name must be at least 3 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email address is required' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the Terms and Privacy Policy' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignupForm() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  // Watch password field dynamically for real-time strength meter
  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data.fullName, data.email, data.password);
      if (result && result.success) {
        toast.success('Account created successfully!', {
          icon: '🎉',
        });
        reset();
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed. Email might already be registered.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <TextInput
        label="Full Name"
        id="fullName"
        placeholder="Jane Doe"
        {...register('fullName')}
        error={errors.fullName}
      />

      {/* Email Address */}
      <TextInput
        label="Email Address"
        id="email"
        type="email"
        placeholder="jane@company.com"
        {...register('email')}
        error={errors.email}
      />

      {/* Password */}
      <div>
        <PasswordInput
          label="Password"
          id="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password}
        />
        {/* Dynamic strength validator */}
        <PasswordStrengthIndicator value={passwordValue} />
      </div>

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        id="confirmPassword"
        placeholder="••••••••"
        {...register('confirmPassword')}
        error={errors.confirmPassword}
      />

      {/* Terms checkbox */}
      <TermsCheckbox
        id="terms"
        {...register('terms')}
        error={errors.terms}
      />

      {/* Submit Create Account button */}
      <div className="pt-2">
        <SubmitButton isLoading={isSubmitting}>Create Account</SubmitButton>
      </div>

      {/* OR divider */}
      <div className="relative my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Outlined navigation link button */}
      <Link
        to="/login"
        className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 text-center text-sm font-semibold text-slate-600 shadow-sm transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
      >
        Sign In to Existing Account
      </Link>
    </form>
  );
}
