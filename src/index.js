import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png'
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import Dashboard from './Dashboard.js'
import ManagerDashboard from './Dashboard.js'
import CustomerDashboard from './Dashboard.js'
import Reservations from './Reservation.js'

const allData = [];

window.addEventListener('load', makeFetchHappen)
$('#login-button').click(userLogIn);
$('#customer-book-button').click(customerMakeNewReservation);

function userLogIn(){
  let username = $('#username-form').val();
  let password = $('#password-form').val();
  let user = new User(username,password);
  user = user.findTypeOfUser();
  let userId = user.getUserId();
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


function displayDashboard(user){
  $('.login-page').toggleClass('hidden');
  let dashboardDisplay = user.goToDashboard();
  dashboardDisplay.displayName();
  let message = dashboardDisplay.welcome();
  $('.welcome-message').text(message);
  if (dashboardDisplay.name === 'manager'){
    return managerDashboardView()
  }
  let bookings = dashboardDisplay.displayBookings();
  let cost = dashboardDisplay.displayTotalCost();
  console.log('cost',cost);
  $('#customer-cost').append(cost);
  $('#customer-upcoming-stays').append(bookings);
}

function managerDashboardView(){
  let reservationView = new Reservations();
  let totalRoomsAvailable = reservationView.viewTodaysAvailability();
  let totalRevenueToday = reservationView.calculateTodaysRevenue();
  let occupancyPercentage = reservationView.calculateOccupancyPercentage();
  $('#number-rooms-available').text(totalRoomsAvailable);
  console.log(reservationView)
  $('#todays-revenue').text(`$${totalRevenueToday}`);
  $('#occupancy-percentage').text(`${occupancyPercentage}%`);
}

function customerMakeNewReservation(){
  $('.customer-dashboard-page').toggleClass('hidden')
  
}

export default allData
