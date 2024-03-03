import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import ChatPage from './pages/chat/ChatPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainLayout from './layouts/MainLayout';
import { authProfile } from './services/auth';
import { setUser } from './redux/slices/userSlice';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import VerificationCodePage from './pages/auth/VerificationCodePage';

function App() {
    const dispatch = useDispatch();
    const [loading, setLoanding] = useState(true);
    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            authProfile()
                .then((res) => {
                    dispatch(
                        setUser({
                            isLogind: true,
                            data: res.data,
                        }),
                    );
                    setLoanding(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoanding(false);
                });
        } else {
            setLoanding(false);
            dispatch(
                setUser({
                    isLogind: false,
                    data: {},
                }),
            );
        }
    }, []);
    return (
        !loading && (
            <Router>
                <div className="app">
                    <Routes>
                        <Route
                            path="/chat"
                            element={
                                <MainLayout>
                                    <ChatPage />
                                </MainLayout>
                            }
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/verification-code" element={<VerificationCodePage />} />
                    </Routes>
                </div>
            </Router>
        )
    );
}

export default App;
