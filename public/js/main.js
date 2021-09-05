const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const day = document.getElementById('day');
const t_date = document.getElementById('today_date');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const change_b = document.getElementById('dda');

var today = new Date();
  var dayy = today.getDay();
  var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  day.innerHTML = daylist[dayy];

var date = today.getDate();
months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'),
curMonth = months[today.getMonth()];
t_date.innerHTML = `${date} ${curMonth}`;

const fToc = fahrenheit => (fahrenheit - 32) * 5/9;


const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    }else{
        console.log(cityVal);

        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=ea0480d9ecfe60f98c333e01179a1084`
            const response = await fetch(url);
            console.log(response);

            const data = await response.json();
            const arrData = [data];
            console.log(arrData);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = (arrData[0].main.temp-273.15).toFixed(1);
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                change_b.style.background = '#2ec4b6';
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                change_b.style.background = '#6d6875';
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                change_b.style.background = '#4895ef';
            } else {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
                change_b.style.background = '#ff4d6d';
            }
            datahide.classList.remove('data_hide');
            cityVal = "";
           
       
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);