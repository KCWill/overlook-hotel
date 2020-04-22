import $ from 'jquery';
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import allData from './index.js'
import Room from './Room.js'


class Reservations {
  constructor(){
    this.reservations = allData[2];
    this.rooms = allData[1];
    this.todaysDate = '';
  }

  getTodaysDate(){
    let today = 0;
    today = new Date();
    let year = 0;
    let month = today.getMonth();
    let day = today.getDate();
    if (today.getDate() < 10){
      day = `0${today.getDate()}`;
    }
    month += 1;
    if (month < 10){
      month = `0${month}`;
    }
    this.todaysDate = `${today.getFullYear()}/${month}/${day}`;
    return this.todaysDate
  }

  listTodaysReservations(){
    this.getTodaysDate();
    let reservationsToday = this.reservations.filter((reservation) => {
      return reservation.date === this.todaysDate
    })
    return reservationsToday
  }

  viewTodaysAvailability(){
    this.getTodaysDate();
    let reservationsToday = this.listTodaysReservations();
    let totalRoomsAvailable = this.rooms.length - reservationsToday.length;
    console.log('alaska',this.rooms.length)
    return totalRoomsAvailable
  }

  calculateTodaysRevenue(){
    this.getTodaysDate();
    let reservationsToday = this.listTodaysReservations();
    let revenue = reservationsToday.reduce((acc,reservation)=>{
      this.rooms.forEach(room => {
        if (room.number === reservation.roomNumber){
          acc += room.costPerNight;
        }
      })
      return acc
    },0)
    return revenue
  }
  calculateOccupancyPercentage(){
    let percentage = Math.round(100*(this.listTodaysReservations().length / this.rooms.length))
    return percentage;
  }
}

export default Reservations
