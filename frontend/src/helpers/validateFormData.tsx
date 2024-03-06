import { emailRegEx, passwordRegEX } from "../constants/regularExpression";
import {
    LoginFormData,
    LoginFormError,
    RegistrationFormData,
    RegistrationFormError,
    StoryForm,
    StoryFormError,
} from "../types/types";

export const validateUserRegistrationForm = (values: RegistrationFormData) => {
    const errors = {} as RegistrationFormError;
    if (!values.email) {
        errors.emailError = "Email richiesta!";
    } else if (!emailRegEx.test(values.email.toLowerCase())) {
        errors.emailError = "Inserisci Email valida!";
    }

    if (!values.name) {
        errors.nameError = "Nome richiesto!";
    } else if (values.name.length < 3 || values.name.length > 100) {
        errors.nameError = "Il Nome deve contenere minimo 3 caratteri!";
    }
    if (!values.about) {
        errors.aboutError = "Bio richiesta!";
    } else if (values.about.length < 4 || values.about.length > 500) {
        errors.aboutError = "Deve contenere almeno 4 caratteri";
    }
    if (!values.password) {
        errors.passwordError = "Password richiesta!";
    } else if (!passwordRegEX.test(values.password)) {
        errors.passwordError =
            "La password deve essere composta da 4-10 caratteri, con almeno 1 carattere speciale, 1 lettera e un numero!";
    }
    if (!values.confirmPassword) {
        errors.confirmPasswordError = "La conferma della password è richiesta!";
    } else if (
        values.confirmPassword &&
        values.confirmPassword !== values.password
    ) {
        errors.confirmPasswordError = "La password non combacia!";
    }
    return errors;
};

export const validateUserLoginForm = (values: LoginFormData) => {
    const errors = {} as LoginFormError;
    if (!values.email) {
        errors.emailError = "Email richiesta!";
    } else if (!emailRegEx.test(values.email.toLowerCase())) {
        errors.emailError = "Inserisci email valida!";
    }
    if (!values.password) {
        errors.passwordError = "Password richiesta!";
    }

    return errors;
};
export const validateStoryUploadForm = (values: StoryForm) => {
    const errors = {} as StoryFormError;
    if (!values.title) {
        errors.titleError = "Titolo richiesto!";
    } else if (values.title.length < 5 || values.title.length > 150) {
        errors.titleError =
            "Il Titolo deve contenere dai 5 ai 50 caratteri";
    }
    if (!values.content) {
        errors.contentError = "Descrizione richiesta!";
    } else if (values.content.length < 5 || values.content.length > 10000) {
        errors.contentError =
            "Il contenuto deve contenere dai 5 ai 10000 caratteri";
    }

    return errors;
};
