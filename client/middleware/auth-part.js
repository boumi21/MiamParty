export default async function({$auth, redirect}) {
    let user = $auth.user;
    if(user && user.isPart){
        //user in
    } else {
        return redirect('/dashboard');
    }
}