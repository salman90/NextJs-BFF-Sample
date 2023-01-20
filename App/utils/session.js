export const sessionOptions = {
    password: 'Enter_Your_Session_Password', //Password must be at least 32 characters long
    cookieName: 'Enter_Your_Cookie_Name',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)\
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};