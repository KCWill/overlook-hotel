import $ from 'jquery';
import User from './User.js'
import Manager from './User.js'
import Customer from './User.js'
import allData from './index.js'


class Dashboard {
  constructor(userId){
    this.userId = userId;
  }
  dashboardPicker(userId){
    if(this.userId > 0 && this.userId < 51){
      return new CustomerDashboard(userId);
    } else if(this.userId === 'manager'){
      return new ManagerDashboard(userId);
    }
  }
}

class ManagerDashboard extends Dashboard {
  constructor(userId){
    super(userId)
  }
  welcome(){
    return `Welcome, manager!`
  }
  displayData() {
  }
}

class CustomerDashboard extends Dashboard {
  constructor(userId){
    super(userId)
    this.userId = userId.userId;
    this.name = '';
  }
  displayData(){
    let nameIndex = parseInt(this.userId);
    this.name = allData[0][nameIndex].name;
    console.log(this.name)
    this.welcome()
  }
  welcome(){
    return `Welcome, ${this.name}`
  }
}


export default Dashboard
