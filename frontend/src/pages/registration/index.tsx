import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";
import Input from "../../components/global/Input";
import Message from "../../components/global/Message";
import Textarea from "../../components/global/Textarea";
import images from "../../constants/images";
import { HOME, LOGIN } from "../../constants/routes";
import { validateUserRegistrationForm } from "../../helpers/validateFormData";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    prepareUserLogin,
    selectAuth,
} from "../../redux/features/login/loginSlice";
import {
    createUserSignup,
    selectRegistration,
} from "../../redux/features/registration/registrationSlice";
import { RegistrationFormData, RegistrationFormError } from "../../types/types";

const Registration = () => {
    // Registration
    const {
        error: signUpError,
        isError: isSignUpErr,
        isLoading: isSignUpLoading,
        user: newUser,
    } = useAppSelector(selectRegistration);
    // login
    const { error, isError, isLoading, token, user } =
        useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegistrationFormData>({
        name: "",
        email: "",
        about: "",
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = useState<RegistrationFormError>({
        nameError: "",
        emailError: "",
        aboutError: "",
        passwordError: "",
        confirmPasswordError: "",
    });

    /* @DESC::  Handling other form data */

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ): void => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({ ...formData, [name]: value });
    };
    /* @DESC::  Handling about */
    const handleAboutElement: React.ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ): void => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({ ...formData, [name]: value });
    };

    /* @DESC::  handling userRegistration */
    const handlerUserRegistration = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        const getValidData = validateUserRegistrationForm(formData);
        setFormError(getValidData);

        if (Object.keys(getValidData).length === 0) {
            const reqData = {
                name: formData.name,
                email: formData.email,
                about: formData.about,
                password: formData.password,
            };

            await dispatch(createUserSignup(reqData));
        }
    };

    let showError = null;
    if (isSignUpErr || isError) {
        showError = (
            <Message
                error={isSignUpErr || isError}
                message={signUpError || error}
            />
        );
    }
    useEffect(() => {
        if (newUser?.id) {
            dispatch(
                prepareUserLogin({
                    username: formData.email,
                    password: formData.password,
                })
            );
        }
    }, [dispatch, formData.email, formData.password, newUser?.id]);
    useEffect(() => {
        if (user && token) {
            navigate(HOME);
        }
    }, [navigate, token, user]);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen ">
            <div className="bg-slate-100 flex items-center justify-center py-8">
                <div className="  w-10/12  sm:w-8/12 md:w-7/12 lg:w-10/12 xl:w-6/12 ">
                    <div className=" flex mb-8 justify-center lg:hidden">
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl text-center lg:text-3xl font-extrabold  mb-20 text-gary-800">
                            Crea un Account
                        </h1>
                        
                    </div>

                    <div>
                        <Input
                            onChange={handleChange}
                            message={formError.nameError}
                            label="Name"
                            name="name"
                            placeholder="Inserisci il tuo nome"
                            value={formData.name}
                        />
                        <Input
                            onChange={handleChange}
                            message={formError.emailError}
                            label="Email"
                            name="email"
                            placeholder="Inserisci la tua Email"
                            value={formData.email}
                        />
                        <Textarea
                            onChange={handleAboutElement}
                            message={formError.aboutError}
                            label="About"
                            name="about"
                            placeholder="Inserisci la tua bio"
                            value={formData.about}
                        />
                        <Input
                            onChange={handleChange}
                            message={formError.passwordError}
                            label="Password"
                            name="password"
                            placeholder="Inserisci la password"
                            value={formData.password}
                            type="password"
                        />
                        <Input
                            onChange={handleChange}
                            message={formError.confirmPasswordError}
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Inserisci conferma password"
                            value={formData.confirmPassword}
                            type="password"
                        />
                        <div className="flex justify-center">
                            <button className="mt-1 mb-1 text-primary-500 cursor-pointer hover:underline text-right ">
                               Password Dimenticata
                            </button>
                        </div>

                        <Button
                            onClick={handlerUserRegistration}
                            title="Registrati"
                            loading={isLoading || isSignUpLoading}
                        />

                        <div className="flex items-center justify-center">
                            <p className="text-sm text-gray-600 mr-2">{`Hai già un account?`}</p>{" "}
                            <button
                                onClick={() => navigate(LOGIN)}
                                className="text-primary-500 cursor-pointer font-semibold hover:underline transition"
                            >
                                Accedi
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

export default Registration;
