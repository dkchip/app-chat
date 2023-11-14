import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import HomePage from './pages/homePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import { userProfile } from './services/auth';
import { setUser } from './redux/slices/userSlice';

function App() {
    const dispatch = useDispatch();
    const [loading, setLoanding] = useState(true);
    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            userProfile()
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
                                    <HomePage />
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <MainLayout>
                                    <LoginPage />
                                </MainLayout>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <MainLayout>
                                    <RegisterPage />
                                </MainLayout>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        )
    );
}

export default App;
