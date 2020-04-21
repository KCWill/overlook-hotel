import $ from 'jquery';
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import FetchData from './FetchData.js'
import FetchRoomData from './FetchData.js'
import FetchUserData from './FetchData.js'


class Dashboard {
  constructor(user){
    this.username = user;
  }
  dashboardPicker(user){
    console.log('dbp',user)
    if(user.username.includes('customer')){
      return new CustomerDashboard(user);
    } else if(user.username === 'manager'){
      return new ManagerDashboard(user);
    }
  }
}

class ManagerDashboard extends Dashboard {
  constructor(user){
    super(user)
    this.user = user;
  }
  welcome(){
    return `Welcome, manager!`
  }
  displayData() {
  }
}

class CustomerDashboard extends Dashboard {
  constructor(user){
    super(user)
    this.user = user;
    this.name = '';
  }
  displayData(){
    let idData = new FetchData(this.user);
    idData = idData.chooseData('ID');
    console.log('dd idData', idData)
    this.name = idData.getName(this.user);
  }
  welcome(){
    return `Welcome, ${this.name}`
  }
}


export default Dashboard
