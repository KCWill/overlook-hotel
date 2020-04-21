import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import Dashboard from './Dashboard.js'
import ManagerDashboard from './Dashboard.js'
import CustomerDashboard from './Dashboard.js'
$('#login-button').click(userLogIn);

function userLogIn(){
  let username = $('#username-form').val();
  let password = $('#password-form').val();
  let user = new User(username,password);
  user = user.findTypeOfUser();
  if (user.verifyLogIn()){
    displayDashboard(user);
  }
}

function displayDashboard(user){
  $('.login-page').toggleClass('hidden');
  let dashboardDisplay = user.goToDashboard(user);
  console.log('dbD',dashboardDisplay)
  dashboardDisplay.displayData();
  console.log('dbD',dashboardDisplay)
  let message = dashboardDisplay.welcome();
  $('.welcome-message').text(message);

}
