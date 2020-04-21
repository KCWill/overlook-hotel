class FetchData {
  constructor(feedData){
    this.data = feedData;
  }
  chooseData(dataType){
    if(dataType === 'ID'){
      return new FetchUserData(user)
    }
  }
}

class FetchRoomData {
  constructor(){
    super()
  }
}

class FetchUserData {
  constructor(){
    super(feedData)
  }
  getName(user){
    fetch()
  }
}

class FetchBookingData {
  constructor(){
    super()
  }
}

export default FetchData
