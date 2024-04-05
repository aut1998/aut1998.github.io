const firebaseConfig = {
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
const LINK = document.querySelector('#H');
const TIME_ON1 = document.querySelector('#time_on1');
const TIME_ON2 = document.querySelector('#time_on2');
const TIME_OFF1 = document.querySelector('#time_off1');
const TIME_OFF2 = document.querySelector('#time_off2');
const TEXTINPUT = document.querySelector('#TextInput');
var ONLINE = 45 ;


// ดึงเวลาที่เคยบันทึกไว้จาก Firebase database
db.ref("T_ON1").on("value", function(snapshot) {
    
    TIME_ON1.value = snapshot.val();
  });

db.ref("T_ON2").on("value", function(snapshot) {
    
    TIME_ON2.value = snapshot.val();
  });

db.ref("T_OFF1").on("value", function(snapshot) {
    
    TIME_OFF1.value = snapshot.val();
  });

db.ref("T_OFF2").on("value", function(snapshot) {
    
    TIME_OFF2.value = snapshot.val();
  });


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

    if( parseInt(ONLINE) >= 50 )
    {
        db.ref('LINK').once('value', (snapshot) => {
            const newValue = snapshot.val();
            LINK.classList.toggle('ON',newValue === 1);
            LINK.classList.toggle('OFF',newValue === 0);
            
        });
        ONLINE = 0 ;
    }
    if(  ONLINE == 3 ) db.ref('LINK').set(parseInt(0));
    ONLINE += 1 ;
    
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





TIME_ON1.addEventListener("change", function() {
  db.ref("T_ON1").set(TIME_ON1.value);
});

TIME_ON2.addEventListener("change", function() {
    db.ref("T_ON2").set(TIME_ON2.value);
  });

TIME_OFF1.addEventListener("change", function() {
    db.ref("T_OFF1").set(TIME_OFF1.value);
  });
  
TIME_OFF2.addEventListener("change", function() {
    db.ref("T_OFF2").set(TIME_OFF2.value);
  });  

TEXTINPUT.addEventListener("change", function() {
    const text = TEXTINPUT.value;
    // db.ref("TEXTINPUT").set(text);
    if( text != "" )
    {
        if       ( text == "ON1" || text == "on1" ) db.ref("SO_1").set(1);
        else if  ( text == "ON2" || text == "on2" ) db.ref("SO_2").set(1);
        else if  ( text == "OFF1"|| text == "off1" ) db.ref("SO_1").set(0);
        else if  ( text == "OFF2"|| text == "off2" ) db.ref("SO_2").set(0);
        else if  ( text == "ON" || text == "on"  ) 
                    {
                        db.ref("SO_1").set(1);
                        db.ref("SO_2").set(1);
                    }
        else if  ( text == "OFF" || text == "off"  ) 
                    {
                        db.ref("SO_1").set(0);
                        db.ref("SO_2").set(0);
                    }        
        // alert("สั่งงานสำเร็จ");
        TEXTINPUT.value = "" ;
    }

  });   

function updateTime() {
    const timeElement = document.querySelector('#H_1');
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    timeElement.textContent = formattedTime;
    
}

setInterval(update_DATA, 700);
setInterval(updateTime, 700);
