import $ from 'jquery';
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import allData from './index.js'


class Dashboard {
  constructor(userId) {
    this.userId = userId;
  }
  dashboardPicker() {
    if (this.userId > 0 && this.userId < 51) {
      return new CustomerDashboard(this.userId);
    } else if (this.userId === 'manager') {
      return new ManagerDashboard(this.userId);
    }
  }
}

class ManagerDashboard extends Dashboard {
  constructor(userId) {
    super(userId)
    this.allBookings = [];
    this.name = 'manager';
  }

  displayName(){
    return
  }

  welcome() {
    return `Welcome, manager!`
  }
  displayData() {
    this.welcome();

  }
}

class CustomerDashboard extends Dashboard {
  constructor(userId) {
    super(userId)
    this.bookings = [];
  }
  displayName() {
    let nameIndex = parseInt(this.userId);
    this.name = allData[0][nameIndex].name;
    this.welcome();
    this.sortBookings();
  }
  welcome() {
    return `Welcome, ${this.name}!`
  }

  sortBookings() {
    let filteredBookings = allData[2].filter(booking => {
      return booking.userID === this.userId
    })
    filteredBookings.sort((a,b)=>{
      let aNew = new Date(a.date)
      let bNew = new Date(b.date)
      return bNew - aNew
    })
    this.bookings = filteredBookings;
    this.displayBookings();
  }

  displayBookings() {
    let bookings = this.bookings.reduce((acc, booking) => {
      let roomDetails = allData[1].find(room => {
        return room.number === booking.roomNumber
      });
      acc += `<section alt='Reservation Information' class='customer-reservation-card' data-id=${booking.id}>
        <p class='res-card-date'>Date: ${booking.date}</p>
        <p class='res-card-room'>Room number: ${booking.roomNumber}</p>
        <p class='res-card-cost'>Cost: $${roomDetails.costPerNight.toFixed(2)}</p>
        </section>`
      return acc
    }, '');
    return bookings
  }
  displayTotalCost() {
    let totalCost = this.bookings.reduce((acc, booking) => {
      let roomDetails = allData[1].find(room => {
        return room.number === booking.roomNumber
      });
      acc += roomDetails.costPerNight
      return acc
    }, 0);
    return totalCost.toFixed(2)
  }
}


export default Dashboard
