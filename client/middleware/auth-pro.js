/*
    Middleware à ajouter pour empêcher les pros à accéder à une page
*/

export default async function({ $auth, redirect }) {
  let user = $auth.user;
  if (user && user.isPro) {
    //user in
  } else {
    return redirect("/dashboard");
  }
}
