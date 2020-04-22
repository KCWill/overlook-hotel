import $ from 'jquery';
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import allData from './index.js'

class Reservations {
  constructor() {
    this.reservations = allData[2];
    this.rooms = allData[1];
    this.todaysDate = '';
  }

  searchReservations() {
    $('.available-reservations-container').empty();
    this.reservations = allData[2];
    this.rooms = allData[1];
    let dayString = $('#day-selection').val();
    let monthString = $('#month-selection').val();
    let yearString = $('#year-selection').val();
    let dateString = `${yearString}/${monthString}/${dayString}`
    let roomType = $('#room-types').val();
    let roomsTaken = this.reservations.reduce((acc, reservation) => {
      if (reservation.date === dateString) {
        acc.push(reservation.roomNumber);
      }
      return acc
    }, [])
    let allRooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

    let availableRooms = allRooms.reduce((acc, room) => {
      if (roomsTaken.indexOf(room) === -1) {
        acc.push(room);
      }
      return acc
    }, [])

    let matchedRoomType = this.rooms.reduce((acc, room) => {
      if (room.roomType === roomType) {
        acc.push(room.number)
      }
      return acc
    }, [])
    let freeRooms = availableRooms.reduce((acc, room) => {
      if (matchedRoomType.includes(room)) {
        acc.push(room)
      }
      return acc
    }, [])
    if(freeRooms.length === 0){
      $('.available-reservations-container').append(`<h3>We are so sorry, but there is no availability for the options you selected.`)
      return
    }
    let foundReservations = freeRooms.reduce((acc, roomNum) => {
      let roomToReserve = this.rooms.find(room => {
        return room.number === roomNum
      })
      acc += `<section alt='Reservation Information' class='customer-reservation-card'>
        <p class='res-card-room'>Room number: ${roomToReserve.number}</p>
        <p class='res-card-cost'>Room cost: $${roomToReserve.costPerNight}</p>
        <p class='res-card-bed-size'>Bed size: ${roomToReserve.bedSize}</p>
        <p class='res-card-num-bed'>Number of Beds: ${roomToReserve.numBeds}</p>
        <p class='res-card-bidet'>Has Bidet: ${roomToReserve.bidet}</p>
        <button type='submit' class='submit-button book-button' data-roomnum='${roomToReserve.number}' data-user='${$('.welcome-message').data('usersid')}' data-date='${dateString}'>Book now!</button>
      </section>`
      return acc
    }, ``);
    $('.available-reservations-container').append(foundReservations)
  }

  getTodaysDate() {
    let today = 0;
    today = new Date();
    let year = 0;
    let month = today.getMonth();
    let day = today.getDate();
    if (today.getDate() < 10) {
      day = `0${today.getDate()}`;
    }
    month += 1;
    if (month < 10) {
      month = `0${month}`;
    }
    this.todaysDate = `${today.getFullYear()}/${month}/${day}`;
    return this.todaysDate
  }

  listTodaysReservations() {
    this.reservations = allData[2];
    this.getTodaysDate();
    let reservationsToday = this.reservations.filter((reservation) => {
      return reservation.date === this.todaysDate
    })
    return reservationsToday
  }

  viewTodaysAvailability() {
    this.rooms = allData[1];
    this.getTodaysDate();
    let reservationsToday = this.listTodaysReservations();
    let totalRoomsAvailable = this.rooms.length - reservationsToday.length;
    return totalRoomsAvailable
  }

  calculateTodaysRevenue() {
    this.rooms = allData[1];
    this.getTodaysDate();
    let reservationsToday = this.listTodaysReservations();
    let revenue = reservationsToday.reduce((acc, reservation) => {
      this.rooms.forEach(room => {
        if (room.number === reservation.roomNumber) {
          acc += room.costPerNight;
        }
      })
      return acc
    }, 0)
    return revenue.toFixed(2)
  }
  calculateOccupancyPercentage() {
    this.rooms = allData[1];
    let percentage = Math.round(100 * (this.listTodaysReservations().length / this.rooms.length))
    return percentage;
  }


}

export default Reservations
