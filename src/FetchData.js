class FetchData {
  constructor(feedData){
    this.data = feedData;
  }
  chooseData(dataType){
    if(dataType === 'ID'){
      return new FetchUserData(this.data)
    }
  }
}

class FetchRoomData extends FetchData {
  constructor(feedData){
    super(feedData)
    this.data = feedData;
  }

}

class FetchUserData extends FetchData {
  constructor(feedData){
    super(feedData)
    this.data = feedData;
  }

  goFetch(){
    let fetchedUserData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
        .then(data => data.json())
        .then((data) => {
          let users = data.users
          return users
        })
    return fetchedUserData
  }


  getName(user){
    this.goFetch(;)
    Promise.fetchedUserData.then(response => {
      
    })
    console.log('datausers', dataUsers)
    let idNumber = dataUsers[0]
    console.log('boop!',idNumber);

    return idNumber
    }
  }


class FetchBookingData extends FetchData {
  constructor(){
    super()
  }
}

export default FetchData
