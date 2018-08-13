
// export const register = [
//     this.createUser(req => req.body),
//     this.createClient({ getUserId: req => req.user._id }),
// ];

// export const login = [
//     this.getUser({ getUserEmail: req => req.body.username }),
//     this.getClient({ getUserId: req => req.user._id }),
//     this.addBasicHeader({ getClient: req => req.client }),
//     this.token()
// ];

// export const logout = [
//     this.authenticate(),
//     this.signout({ getToken: req => req.token })
// ];

// export const authenticate = (req, res, next) => {
//     const request = new Request(req);
//     const response = new Response(res);

//     Server.authenticate(request, response)
//         .then(token => {
//             req.token = token;
//             next();
//         })
//         .catch(err => {
//             res.set(response.headers);
//             res.sendStatus(err.statusCode);
//         });
// };

// export const createUser = (getAttributes) => async (req, res, next) => {
//     const {
//         name,
//         password,
//         email } = pick(getAttributes(req), ['name', 'email', 'password']);

//     const user = await User.findOne({ email });

//     if (user) {
//         return next(new AppHttpError(400, 'EXIST'));
//     }

//     req.user = await new User({ name, password, email }).save();

//     next();
// };

// export const createClient = ({ getUserId }) => async (req, res, next) => {

//     const userId = getUserId(req);

//     const client = new Client({
//         clientId: crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex'),
//         clientSecret: crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex'),
//         name: 'oauth2',
//         grants: ['password', 'refresh_token', 'authorization_code', 'client_credentials'],
//         redirect_uris: ['https://www.getpostman.com/oauth2/callback'], // 'http://localhost:3000/cb'],
//         user_id: userId,
//         accessTokenLifetime,
//         refreshTokenLifetime
//     });

//     req.client = await client.save();

//     next();
// };

// export const buildLoginRequest = ({ getUsername, getPassword }) => async (req, res, next) => {

//     req.body.username = getUsername(req); // req.body.email;
//     req.body.password = getPassword(req); // req.body.password;
//     req.body.grant_type = 'password';

//     next();
// };

// export const signout = ({ getToken }) => async (req, res, next) => {
//     const token = getToken(req);

//     await AccessToken.remove({ user_id: token.user._id });

//     res.sendStatus(200);
// };

// export const getUser = ({ getUserEmail }) => async (req, res, next) => {
//     const email = getUserEmail(req);

//     const user = await User.findOne({ email });
//     if (!user) {

//         return next(new AppHttpError(400, 'NOT_EXIST'));
//     }
//     req.user = user;
//     next();
// };

// export const getClient = ({ getUserId }) => async (req, res, next) => {
//     const user_id = getUserId(req);

//     const client = await Client.findOne({ user_id });
//     req.client = client;
//     next();
// };

// export const addBasicHeader = ({ getClient }) => (req, res, next) => {
//     const client = getClient(req);

//     const clientCredentials = client.clientCredentials();
//     //            req1.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//     // req.headers['Content-Type'] = 'application/x-www-form-urlencoded';

//     if (!req.headers['authorization']) {
//         req.headers['authorization'] = `Basic ${clientCredentials}`;
//         res.set({ 'basic': clientCredentials });
//     }

//     next();
// };

// export const token = async (req, res, next) => {
//     const request = new Request(req);
//     const response = new Response(res);

//     request.headers['content-type'] = 'application/x-www-form-urlencoded';

//     const [error, access] = await to(Server.token(request, response));
//     if (error) { next(error); }

//     const user = await User.findById(access.user.id);
//     const client = await Client.findById(access.client.id);

//     response.body.user = user;
//     response.body.basic = (<any>client).clientCredentials();

//     res.set(response.headers);
//     res.json(response.body);
// };

// export const authorize = async (req, res, next) => {

//     const request = new Request(req);
//     const response = new Response(res);

//     request.query.allowed = 'true';

//     const code = await Server.authorize(request, response);

//     res.status(response.status)
//         .set(response.headers)
//         .end();
// };

// export const loginPage = (req, res, next) => {
//     const loginFile = join(__dirname + '/login.html');

//     res.sendFile(loginFile);
// };

