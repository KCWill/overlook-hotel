import $ from 'jquery';
import './css/base.scss';
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
$('#customer-book-button').click(makeNewReservationCust);
$('main').on('click', 'button.book-button', 'roomnum', bookReservation);
$('main').on('click', 'button#cancel-reservation-button', 'reservationid', cancelReservation);
$('#go-back-to-customer-dashboard').click(goBackToDashboardCustomer);
$('#go-back-to-manager-dashboard').click(goBackToDashboardManager);
$('#customer-search').keyup(searchCustomers);
$('#manager-book-button').click(makeNewReservationManager);



function userLogIn() {
  let username = $('#username-form').val();
  let password = $('#password-form').val();
  let user = new User(username, password);
  user = user.findTypeOfUser();
  let userId = user.getUserId();
  if (user.verifyLogIn()) {
    displayDashboard(user, userId);
  }
}

function initializeData(usersData, roomsData, bookingsData) {
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
    .then(data => initializeData(data[0].users, data[1].rooms, data[2].bookings))
}


function displayDashboard(user) {
  $('.login-page').toggleClass('hidden');
  let dashboardDisplay = user.goToDashboard();
  $('.manager-dashboard-page').toggleClass('hidden')
  dashboardDisplay.displayName();
  let message = dashboardDisplay.welcome();
  $('.welcome-message').data('usersid', `${user.userId}`);
  $('.welcome-message').text(message);
  if (dashboardDisplay.name === 'manager') {
    return managerDashboardView()
  }
  let bookings = dashboardDisplay.displayBookings();
  let cost = dashboardDisplay.displayTotalCost();
  $('#customer-cost').append(cost);
  $('#customer-upcoming-stays').append(bookings);
}

function managerDashboardView() {
  let reservationView = new Reservations();
  let totalRoomsAvailable = reservationView.viewTodaysAvailability();
  let totalRevenueToday = reservationView.calculateTodaysRevenue();
  let occupancyPercentage = reservationView.calculateOccupancyPercentage();
  $('#number-rooms-available').text(totalRoomsAvailable);
  $('#todays-revenue').text(`$${totalRevenueToday}`);
  $('#occupancy-percentage').text(`${occupancyPercentage}%`);
}

function makeNewReservationCust() {
  $('.customer-dashboard-page').toggleClass('hidden')
  $('.make-new-reservation-page').toggleClass('hidden');
  $('#go-back-to-customer-dashboard').toggleClass('hidden');
  let newRes = new Reservations();
  $('#submit-room-search-button').click(newRes.searchReservations)
}

function makeNewReservationManager() {
  $('.manager-dashboard-page').toggleClass('hidden')
  $('.make-new-reservation-page').toggleClass('hidden');
  $('#go-back-to-manager-dashboard').toggleClass('hidden');
  let newRes = new Reservations();
  $('#submit-room-search-button').click(newRes.searchReservations)
}

function bookReservation() {
  let userID = Number(this.dataset.user)
  let roomNum = Number(this.dataset.roomnum)
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": userID,
        "date": this.dataset.date,
        "roomNumber": roomNum
      })
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err))
    $(this).addClass('hidden');
}

function goBackToDashboardCustomer() {
  $('.make-new-reservation-page').toggleClass('hidden');
  $('.customer-dashboard-page').toggleClass('hidden');
}

function searchCustomers() {
  let manager = new Dashboard('manager')
  let text = $('#customer-search').val()
  manager.searchCustomerReservations(text);
}

function cancelReservation() {
  let reservationID = Number(this.dataset.reservationid)
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": reservationID
      })
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => console.log(err));
    $(this).addClass('hidden')
}

function goBackToDashboardManager() {
  $('.make-new-reservation-page').addClass('hidden');
  $('.manager-dashboard-page').removeClass('hidden');
}

export default allData
