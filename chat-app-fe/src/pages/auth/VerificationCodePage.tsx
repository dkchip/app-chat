import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VerificationInput from 'react-verification-input';

import { RootState } from '../../redux/store';
import { verificationCode as verificationCodeAPI, getVerificationInfor } from '../../services/auth';

interface VerificationType {
    _id: string;
    email: string;
    created_at: string;
    expires_at: string;
}

const VerificationCodePage: React.FC = () => {
    const isLogind = useSelector((state: RootState) => state.user.isLogind);
    const idVerification = new URLSearchParams(useLocation().search).get('_id');

    const [emailVerificationData, setEmailVerificationData] = useState<VerificationType | null>(null);
    const [expiresError, setExpiresError] = useState<boolean>(false);
    const [verificationCode, setVerificationCode] = useState<number>();

    useEffect(() => {
        if (idVerification) {
            getVerificationInfor(idVerification)
                .then((res) => {
                    setEmailVerificationData(res.data);
                })
                .catch((err) => {
                    if (err.response.status && err.response.status == 401) {
                        setExpiresError(true);
                    }
                });
        } else {
            window.location.href = '/login';
        }
    }, [idVerification]);

    useEffect(() => {
        if (isLogind) {
            window.location.href = '/chat';
        }
    }, [isLogind]);

    const onVerificationCodeChange = (value: string): void => setVerificationCode(Number.parseInt(value));
    const handleVerificationCode = async () => {
        if (idVerification && verificationCode) {
            verificationCodeAPI(idVerification, verificationCode)
                .then((res) => {
                    console.log(res);
                    window.location.href = '/login';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

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
                            Verification your code
                        </h1>
                        {!expiresError ? (
                            <form className="space-y-4 md:space-y-6" action="#">
                                <span className="text-white">
                                    Please enter verification code we sent to you email{' '}
                                    {emailVerificationData && emailVerificationData.email}
                                </span>
                                <div>
                                    <VerificationInput
                                        classNames={{
                                            container: 'w-full h-[60px]',
                                            character: 'rounded-[8px] h-[60px]',
                                        }}
                                        placeholder=""
                                        validChars="0-9"
                                        onChange={onVerificationCodeChange}
                                    />
                                </div>

                                <button
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={handleVerificationCode}
                                >
                                    Confirm
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
                        ) : (
                            <div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Verification is expire{' '}
                                    <Link
                                        to={'/forgot-password'}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Get new code
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerificationCodePage;
