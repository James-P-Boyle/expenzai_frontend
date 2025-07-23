import Link from 'next/link'
import Logo from '@/app/components/ui/Logo'
import RegisterForm from '@/app/components/RegisterForm'

export default function LoginPage() {

    return (
        <div className="min-h-screen flex items-center justify-center py-6 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className='flex flex-col justify-center items-center'>
                    <Logo />
                    <h2 className="mt-6 text-center text-3xl font-extrabold">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-ci-muted">
                        Or{' '}
                        <Link href="/auth/register" className="font-medium text-ci-main hover:text-ci-main">
                            create a new account
                        </Link>
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    )
}