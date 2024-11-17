module.exports = {
    PATH_NAME: {
        SIGN_IN: 'sign-in',
        SIGN_UP: 'sign-up',
        HOMEPAGE: ""
    },
    LABELS: {
        SIGN_IN: 'Sign In',
        SIGN_UP: 'Sign Up',
        USER_LINK_ACCOUNT: "Link account to get started",
        USER_ENTER_DETAILS: "Enter your details",
        USER_HAS_ACCOUNT: "Have an account?",
        USER_DONT_HAVE_ACCOUNT: "Dont have an account?",
    },

    getPathLink : (pathName) => {
        return "/" + pathName
    }
}
