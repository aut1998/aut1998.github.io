const firebaseConfig = {
    // apiKey: "AIzaSyBlefZE9wmvPjgA5GKLyPYuuViyr5yfzbA",
    // authDomain: "test-1-f57fa.firebaseapp.com",
    // databaseURL: "https://test-1-f57fa-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "test-1-f57fa",
    // storageBucket: "test-1-f57fa.appspot.com",
    // messagingSenderId: "367931962760",
    // appId: "1:367931962760:web:5535a8993492d9eeb0b63d"

    apiKey: "AIzaSyAZYMchGmLJoDj3YDOuTyZvERlI2pvm7Vs",
    authDomain: "esp8266-934e5.firebaseapp.com",
    databaseURL: "https://esp8266-934e5-default-rtdb.firebaseio.com",
    projectId: "esp8266-934e5",
    storageBucket: "esp8266-934e5.appspot.com", 
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let DP_ON = "เปิดจ้า" ;
let DP_OFF = "ดับแล้ว" ;

const SW_1 = document.querySelector('#SW_1');
const SW_2 = document.querySelector('#SW_2');

function update_DATA() {
    db.ref('SO_1').once('value',(snapshot) => {
        const newValue = snapshot.val();
        SW_1.classList.toggle('ON', newValue === 1);
        SW_1.classList.toggle('OFF', newValue === 0);
        SW_1.innerHTML = newValue === 1 ? DP_ON : DP_OFF ;
    });

    db.ref('SO_2').once('value',(snapshot) => {
        const newValue = snapshot.val();
        SW_2.classList.toggle('ON', newValue === 1);
        SW_2.classList.toggle('OFF', newValue === 0);
        SW_2.innerHTML = newValue === 1 ? DP_ON : DP_OFF ;
    });
}

SW_1.addEventListener('click', (event) => {
    db.ref('SO_1').once('value',(snapshot) => {
        const currentValue = snapshot.val();
        const newValue = !currentValue ? 1:0 ;
        db.ref('SO_1').set(newValue);
        SW_1.classList.toggle('ON', newValue === 1);
        SW_1.classList.toggle('OFF', newValue === 0);
        SW_1.innerHTML = newValue === 1 ? DP_ON : DP_OFF;    
    });
    
});


SW_2.addEventListener('click', (event) => {
    db.ref('SO_2').once('value',(snapshot) => {
        const currentValue = snapshot.val();
        const newValue1 = !currentValue ? 1:0 ;
        db.ref('SO_2').set(newValue1);
        SW_2.classList.toggle('ON', newValue1 === 1);
        SW_2.classList.toggle('OFF', newValue1 === 0);
        SW_2.innerHTML = newValue1 === 1 ? DP_ON : DP_OFF;
    });
    
});

function updateTime() {
    const timeElement = document.querySelector('#H_1');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    timeElement.textContent = formattedTime;
}

setInterval(update_DATA, 700);
setInterval(updateTime, 700);
