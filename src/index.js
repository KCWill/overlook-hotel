import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import Dashboard from './Dashboard.js'
import ManagerDashboard from './Dashboard.js'
import CustomerDashboard from './Dashboard.js'

const allData = [];

window.addEventListener('load', makeFetchHappen)
$('#login-button').click(userLogIn);

function userLogIn(){
  let username = $('#username-form').val();
  let password = $('#password-form').val();
  let user = new User(username,password);
  user = user.findTypeOfUser();
  let userId = user.getUserId();
  console.log(allData)
  if (user.verifyLogIn()){
    displayDashboard(user, userId);
  }
}

function intializeData(usersData, roomsData, bookingsData) {
  allData.push(usersData);
  allData.push(roomsData);
  allData.push(bookingsData);
  return allData
}

function makeFetchHappen() {
  let userPromise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json());
  let roomsPromise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json());
  let bookingsPromise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json());
  Promise.all([userPromise, roomsPromise, bookingsPromise])
    .then(data => intializeData(data[0].users, data[1].rooms, data[2].bookings))
}


function displayDashboard(user, userId){
  $('.login-page').toggleClass('hidden');
  let dashboardDisplay = user.goToDashboard(user);
  console.log('dbD',dashboardDisplay)
  dashboardDisplay.displayData();
  console.log('dbD',dashboardDisplay)
  let message = dashboardDisplay.welcome();
  $('.welcome-message').text(message);
}
export default allData
