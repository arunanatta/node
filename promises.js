// promises chaining 


var first = function(){
    var promise = new Promise(function pro(resolve, reject){
        setTimeout(function () {
            console.log('first');
            resolve({data: '123'});
        },2000)
    })
    return promise;
}

var second = function(some){
    var promise = new Promise(function pro(resolve, reject){
        setTimeout(function () {
            console.log('second');
            resolve({newData: some.data + '123'});
        },2000)
    })
    return promise;
}

var third = function(some){
    var promise = new Promise(function pro(resolve, reject){
        setTimeout(function () {
            console.log('third');
            resolve({result: some.newData});
        },2000)
    })
    return promise;
}


first()
    .then(second)
    .then(third);



let records = [
    { id: 787, from_date: "2019-10-28T12:00:00Z", to_date: "2019-10-28T12:00:00Z", start_time: "09:22:30", end_time: "11:27:30" },
    { id: 331, from_date: "2019-10-29T12:00:00Z", to_date: "2019-11-01T12:00:00Z", start_time: "05:00:00", end_time: "07:30:00" }
]

function findTotalHoursOccupied(times: any, day: Date) {
    let start = null, end = null, total = 0;
    //loop through all the records of the day
    for (let time of times) {
        start = new Date(time.from_date.split("T")[0] + ' ' + time.start_time)
        end = new Date(time.to_date.split("T")[0] + ' ' + time.end_time)
        //if the day is in between reserving days, which means whole day has been booked so return 24 hours as occupied
        //ex: day = 28-10-2019, user books from = 27-10-2019 to 29-10-2019
        if (day.getTime() > start.getTime() && day.getTime() < end.getTime()){
            return 24
        }
        //if the day is equal to from date but end date is greater than current day
        //ex: day = 28-10-2019, user books from = 28-10-2019 to 30-10-2019
        else if (day.getDate() === start.getDate() && day.getTime() < end.getTime()) {
            total += 24 - parseFloat(start.getHours() + '.' + start.getMinutes())
        }
        //if the day is greater than from date bur end date is equal to the current day
        //ex: day = 30-10-2019, user books from = 27-10-2019 to 30-10-2019
        else if (day.getTime() > start.getTime() && day.getDate() === end.getDate()) {
            total += parseFloat(end.getHours() + '.' + end.getMinutes())
        }
        //if day is equal to from and end dates
        //ex: day = 28-10-2019, user books from = 28-10-2019 to 28-10-2019
        else {
            total += parseFloat(end.getHours() + '.' + end.getMinutes())
                - parseFloat(start.getHours() + '.' + start.getMinutes())
        }
    }
    return parseFloat(total+'').toFixed(2)
}

function formatWeekRecords(records: any, start: string, end: string) { 
    let result = []
    let start_date = new Date(start)
    let end_date = new Date(end)
    // seconds * minutes * hours * milliseconds = 1 day 
    // it will be useful to increase day
    let day = 60 * 60 * 24 * 1000;
    //loop through 7 days of a week
    for (let i = 0; i < 7; i++){
        //array to store id's of users who register for that day
        let ids : string[] = []
        //get the currunt date by incrementing start date to i*day
        let curr_date = new Date(start_date.getTime()+(i*day))
        //intializing day object which is a part of result
        let temp = { date: curr_date, id  : ids,free: 24,reserved:0}
        //get that days records
        let daysRecords = records.filter((record:any) => {
          let from = new Date(record.from_date.split("T")[0])
          let to =  new Date(record.to_date.split("T")[0])
          
          let bool = from.getTime() === curr_date.getTime() || to.getTime() === curr_date.getTime() || (from.getTime() < curr_date.getTime() && to.getTime() > curr_date.getTime())
          //if bool true means that record is belongs to the current date, add user id to the array
          if (bool) {
            ids.push(record.id)
          }
          return bool
        })
        //console.log(daysRecords)
        //if there are records with the current date in the week records
        if (daysRecords.length != 0) {
            //find the total occupied time of that day
            let occupied = findTotalHoursOccupied(daysRecords, curr_date)
            temp.reserved = parseFloat(occupied+'')
            temp.free = 24 - parseFloat(occupied + '')
            //add all the user id's who reserved for that day
            temp.id = ids
            //push current day record to result
            result.push(temp)
        } else {
            //if there are no records on that day, so no reservations then by default free is 24 hours
            //so we can just push the default object to result
            result.push(temp)
        }
        //console.log(temp)
    }
    return result
}

//date format should be month first because the new Date() object will return invalid date
console.log(formatWeekRecords(records,"10-27-2019","11-02-2019"))

