//
// class FetchData {
//   constructor(feedData){
//     this.userDataPromise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
//     fetchPromise.then(response => {
//       return response.json()
//     }).then(response => {
//       idData.welcome(this.getName(response))
//       }).catch(error => console.log(error.message))
//   }
//   goFetch() {
//     let fetchPromise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
//     fetchPromise.then(response => {
//       return response.json()
//     }).then(response => {
//       idData.welcome(this.getName(response))
//       }).catch(error => console.log(error.message));
//   }
//
//   makeUsers(users){
//     this.userData = users.users;
//     return this.userData
//     }
//
//   getName(users){
//     return users.users[0].name;
//   }
//
// }
//
// export default FetchData
