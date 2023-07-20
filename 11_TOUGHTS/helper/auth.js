export default class checkAuth {
    static checkAuth(req, res, next) {
        const userId = req.session.userid;

        if (!userId) {
            res.redirect('/login');
            return
        }
        next();
    }
}