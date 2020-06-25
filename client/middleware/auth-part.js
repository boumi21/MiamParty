/*
    Middleware à ajouter pour empêcher les particuliers à accéder à une page
*/

export default async function({ $auth, redirect }) {
  let user = $auth.user;
  if (user && user.isPart) {
    //user in
  } else {
    return redirect("/dashboard");
  }
}
