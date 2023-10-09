const totalTimeP = Array.from(document.querySelectorAll('.total-time'))
const currentHours = Array.from(document.querySelectorAll('.hours'))
const dailyBtn = document.querySelector('#Daily')
const weeklyBtn = document.querySelector('#Weekly')
const monthlyBtn = document.querySelector('#Monthly')
const dailyLabel = document.querySelector('.daily-js')
const weeklyLabel = document.querySelector('.weekly-js')
const monthlyLabel = document.querySelector('.monthly-js')
const jsonData = [];
async function swapTimes(){
    try {
        const promise = await fetch('./data.json')
    
        const data = await promise.json();
        jsonData.push(data);
        return jsonData
    } catch (error) {
        console.log("An error occurred "+ error)
        throw error;
    }
  
}
async function useReceivedData(){
    let data;
    try{
        data = await swapTimes()
    }catch(error){
        console.log("An error ocurred " + error)
    }
    
    if(dailyBtn.checked){
        dailyLabel.classList.add('active')
        for(let i =0;i<currentHours.length;i++){
            currentHours[i].textContent = `${data[0][i].timeframes.daily.current}hrs`
            totalTimeP[i].textContent = `Last Day - ${data[0][i].timeframes.daily.previous}hrs`

        }
    }
    else{
        dailyLabel.classList.remove('active')
    }
    if(weeklyBtn.checked){
        weeklyLabel.classList.add('active')
        for(let i =0;i<currentHours.length;i++){
            currentHours[i].textContent = `${data[0][i].timeframes.weekly.current}hrs`
            totalTimeP[i].textContent = `Last Week - ${data[0][i].timeframes.weekly.previous}hrs`

        }
        

    }else{
        weeklyLabel.classList.remove('active')
    }
    if(monthlyBtn.checked){
        monthlyLabel.classList.add('active')
        for(let i =0;i<currentHours.length;i++){
            currentHours[i].textContent = `${data[0][i].timeframes.monthly.current}hrs`
            totalTimeP[i].textContent = `Last Week - ${data[0][i].timeframes.monthly.previous}hrs`

        }
    }else{
        monthlyLabel.classList.remove('active')
    }
}


function addEnterBehavior(){
    weeklyLabel.addEventListener('keyup',(e) =>{
        if(e.key ==='Enter'){
            weeklyBtn.checked = true;
            useReceivedData();
        }
    })
    dailyLabel.addEventListener('keyup',(e) =>{
        if(e.key==="Enter"){
            dailyBtn.checked = true;
            useReceivedData();
        }
    })
    monthlyLabel.addEventListener('keyup',(e) =>{
        if(e.key ==="Enter"){
            monthlyBtn.checked = true;
            useReceivedData();
        }
    })
}
addEnterBehavior();
dailyBtn.addEventListener('click',useReceivedData)
weeklyBtn.addEventListener('click',useReceivedData)
monthlyBtn.addEventListener('click',useReceivedData)
