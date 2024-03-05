import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";
import Input from "../../components/global/Input";
import Message from "../../components/global/Message";
import images from "../../constants/images";
import { HOME, REGISTRATION } from "../../constants/routes";
import { validateUserLoginForm } from "../../helpers/validateFormData";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    prepareUserLogin,
    selectAuth,
} from "../../redux/features/login/loginSlice";
import { LoginFormData, LoginFormError } from "../../types/types";

const Login = () => {
    const navigate = useNavigate();
    const { error, isError, isLoading, token, user } =
        useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState<LoginFormError>({
        emailError: "",
        passwordError: "",
    });
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ): void => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };

    /* @DESC::  handling userLogin */
    const handlerUserLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const getValidData = validateUserLoginForm(formData);
        setFormError(getValidData);

        if (Object.keys(getValidData).length === 0) {
            const reqData = {
                username: formData.email,
                password: formData.password,
            };

            dispatch(prepareUserLogin(reqData));
        }
    };

    let showError = null;
    if (isError) {
        showError = <Message error={isError} message={error} />;
    }

    useEffect(() => {
        if (user && token) {
            navigate(HOME);
        }
    }, [navigate, token, user]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="bg-slate-100 flex items-center justify-center py-8">
                <div className="  w-10/12  sm:w-8/12 md:w-7/12 lg:w-10/12 xl:w-6/12 ">
                    <div className=" flex mb-8 justify-center lg:hidden">
                     
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl text-center mb-6 lg:text-3xl font-extrabold  text-gary-800">
                            Bentornato!!
                        </h1>
                        <p className="text-gray-600 text-center mb-6 text-sm md:text-lg mb-4">
                            Per favore inserisci i tuoi dati...
                        </p>
                    </div>

                    <div>
                        <Input
                            onChange={handleChange}
                            name="email"
                            message={formError.emailError}
                            label="Email"
                            placeholder="Inserisci email"
                            value={formData.email}
                        />
                        <Input
                            onChange={handleChange}
                            name="password"
                            message={formError.passwordError}
                            label="Password"
                            placeholder="Inserisci password"
                            value={formData.password}
                            type="password"
                        />
                        <div className="flex justify-center">
                            <button className="mt-1 mb-1 text-primary-500 cursor-pointer hover:underline text-right ">
                                Password dimenticata
                            </button>
                        </div>

                        <Button
                            onClick={handlerUserLogin}
                            title="Accedi"
                            loading={isLoading}
                        />
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-gray-600 mr-2">{`Non hai un account?`}</p>{" "}
                            <button
                                onClick={() => navigate(REGISTRATION)}
                                className="text-primary-500 cursor-pointer font-semibold hover:underline transition"
                            >
                                Registrati
                            </button>
                        </div>

                        {showError}
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 hidden lg:flex items-center justify-center">
                <Link to={HOME}>
                    <img
                        alt="blog_image"
                        className=" w-[150px] xs:w-[180px] sm:w-[200px] lg:w-[300px] object-cover "
                        src={images.logo}
                    />
                </Link>
            </div>
        </div>
    );
};

export default Login;
