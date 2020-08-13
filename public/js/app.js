const weatherForm = document.querySelector('form');
const locationButton = document.querySelector('#location-button');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = e.target.elements.search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(!data.error){
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
            else
            {
                messageOne.textContent = `${data.error}`;
            }
        });
    });
});

locationButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude }  = position.coords;

        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';

        fetch(`/weather/myLocation?latitude=${latitude}&longitude=${longitude}`).then((response) => {
            response.json().then((data) => {
                if(!data.error){
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
                else
                {
                    messageOne.textContent = `${data.error}`;
                }
            });
        });
    })
});