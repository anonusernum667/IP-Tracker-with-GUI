let lat = 12;
let lng = 5;
let map = L.map('map', {
    layers: [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        })
    ],
    center: [lat, lng],
    zoom: 2
});


function ipinforeq(){
    fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_3B4gbGhebys4vFqVh8yQleMGFT2t5&ipAddress='+ ip)
    .then(
        Response => Response.json())
        .then(data => {
            const ip = data.ip;
            const ipcont = document.getElementById('ipmcont');
            ipcont.innerText = ip;
            // first 
            const location = data.location.country +","+ data.location.region;
            const locationCont = document.getElementById('locmcint');
            locationCont.innerHTML = location;
            // SECOND
            const timezone = data.location.timezone;
            const utcm = document.getElementById('utc');
            utcm.innerHTML = timezone;
            // third
            const isp = data.isp;
            const ispm = document.getElementById('ispm');
            ispm.innerHTML = isp;
            // forth
            let lat = data.location.lat;
            let lng = data.location.lng;
            var marker = L.marker([lat, lng]).addTo(map);
            console.log(data);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function ipvalidation() {
    var isValid = true;
    const ip = document.getElementById('ipse').value.trim();
    const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (ipAddressRegex.test(ip)) {
        ipinforeq(); // Assuming this function is defined elsewhere
        console.log('Valid IP');
    } else {
        console.log("Invalid IP");
        isValid = false;
        isValid = false;
        let alterPlaceHolder = "Enter a valid ip";
        document.getElementById('ipse').style.border="1px solid red";
        var style = document.createElement('style');
        var cssCode = document.createTextNode('::placeholder{color:var(--c, red);}');
        style.appendChild(cssCode);
        document.head.appendChild(style);
        document.getElementById('ipse').value = '';
        document.getElementById('ipse').placeholder = alterPlaceHolder;
    }
}

document.getElementById('subm').addEventListener('click', ipvalidation);















