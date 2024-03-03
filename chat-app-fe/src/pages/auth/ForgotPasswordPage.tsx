import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { getCodeByEmail } from '../../services/auth';

const ForgotPasswordPage: React.FC = () => {
    const isLogind = useSelector((state: RootState) => state.user.isLogind);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string }>();

    const handleGetCode: SubmitHandler<{ email: string }> = async (data) => {
        getCodeByEmail(data.email)
            .then((res) => {
                window.location.href = `/verification-code?_id=${res.data._id}`;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isLogind) {
            window.location.href = '/chat';
        }
    }, [isLogind]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    Chat - App
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Forgot password
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(handleGetCode)}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                />
                                {errors.email && errors.email.type === 'pattern' && (
                                    <p className="text-red-500">Invalid email address</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Get code
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <Link
                                    to={'/register'}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordPage;
