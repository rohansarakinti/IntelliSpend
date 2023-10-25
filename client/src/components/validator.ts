export default function Validator(email: string, password: string, confirmEmail: string, confirmPassword: string) {
    let error = false
    let errors = {
        email: {
            error: false,
            errorMessage: ""
        },
        confirmEmail: {
            error: false,
            errorMessage: ""
        },
        password: {
            error: false,
            errorMessage: ""
        },
        confirmPassword: {
            error: false,
            errorMessage: ""
        }
    }
    if (!email) {
        errors.email.error = true
        errors.email.errorMessage = "Email is required"
        error = true
    } else if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
        errors.email.error = true
        errors.email.errorMessage = "Invalid email address"
        error = true
    } else if (email !== confirmEmail) {
        errors.email.error = true
        errors.email.errorMessage = "Emails do not match"
        errors.confirmEmail.error = true
        errors.confirmEmail.errorMessage = "Emails do not match"
        error = true
    }
    if (!password) {
        errors.password.error = true
        errors.password.errorMessage = "Password is required"
        error = true
    } else if (password.length < 6) {
        errors.password.error = true
        errors.password.errorMessage = "Password must be at least 6 characters"
        error = true
    } else if (password !== confirmPassword) {
        errors.password.error = true
        errors.password.errorMessage = "Passwords do not match"
        errors.confirmPassword.error = true
        errors.confirmPassword.errorMessage = "Passwords do not match"
        error = true
    }
    return {
        error, errors
    }
}