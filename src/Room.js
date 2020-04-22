import $ from 'jquery';
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import allData from './index.js'
import Room from './Room.js'

class Room {
  constructor(room){
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds
  }
}
export default Room
