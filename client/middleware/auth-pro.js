export default async function({$auth, redirect}) {
    let user = $auth.user;
    if(user && user.isPro){
        //user in
    } else {
        return redirect('/dashboard');
    }
}