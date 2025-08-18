const cookieOptions: any = {
    httpOnly: true,
    secure: process.env.EXPRESS_NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
};

if (process.env.EXPRESS_NODE_ENV === 'production' && process.env.EXPRESS_DOMAIN) {
    cookieOptions.domain = process.env.EXPRESS_DOMAIN;
}

export default cookieOptions;