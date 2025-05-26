const seatsData = [
    { name: 'A1', price: 100, booked: false },
    { name: 'A2', price: 100, booked: false },
    { name: 'A3', price: 100, booked: false },
    { name: 'A4', price: 100, booked: false }, // Booked
    { name: 'A5', price: 100, booked: false },
    { name: 'B1', price: 150, booked: false },
    { name: 'B2', price: 150, booked: false}, // Booked
    { name: 'B3', price: 150, booked: false },
    { name: 'B4', price: 150, booked: false },
    { name: 'B5', price: 150, booked: false },
    { name: 'C1', price: 200, booked: false },
    { name: 'C2', price: 200, booked: false },
    { name: 'C3', price: 200, booked: false }, // Booked
    { name: 'C4', price: 200, booked: false },
    { name: 'C5', price: 200, booked: false },
];

const seatsContainer = document.querySelector('.seats');
const selectedSeatsContainer = document.getElementById('selected-seats');
const totalPriceContainer = document.getElementById('total-price');
const availableSeatsContainer = document.getElementById('available-seats');
const bookedSeatsContainer = document.getElementById('booked-seats');
const submitButton = document.getElementById('submit-button');

let selectedSeats = [];
let totalPrice = 0;

// Function to count available and booked seats
function countSeats() {
    const bookedCount = seatsData.filter(seat => seat.booked).length;
    const availableCount = seatsData.length - bookedCount;
    
    bookedSeatsContainer.innerHTML = `Booked Seats: ${bookedCount}`;
    availableSeatsContainer.innerHTML = `Available Seats: ${availableCount}`;
}

// Generate seat elements
seatsData.forEach(seat => {
    const seatElement = document.createElement('div');
    seatElement.className = 'seat' + (seat.booked ? ' booked' : '');
    seatElement.innerHTML = `${seat.name} - $${seat.price}`;
    seatElement.dataset.price = seat.price;
    seatElement.dataset.name = seat.name;
    
    if (!seat.booked) {
        seatElement.addEventListener('click', () => {
            if (selectedSeats.includes(seat.name)) {
                selectedSeats = selectedSeats.filter(s => s !== seat.name);
                totalPrice -= seat.price;
                seatElement.classList.remove('selected');
            } else {
                selectedSeats.push(seat.name);
                totalPrice += seat.price;
                seatElement.classList.add('selected');
            }
            updateSummary();
        });
    }

    seatsContainer.appendChild(seatElement);
});

// Update the summary
function updateSummary() {
    selectedSeatsContainer.innerHTML = selectedSeats.length > 0 ? `Selected Seats: ${selectedSeats.join(', ')}` : 'Selected Seats: None';
    totalPriceContainer.innerHTML = `Total Price: $${totalPrice}`;
    submitButton.disabled = selectedSeats.length === 0;
}

// Handle booking when the button is clicked
submitButton.addEventListener('click', () => {
    selectedSeats.forEach(seatName => {
        const seat = seatsData.find(s => s.name === seatName);
        if (seat) {
            seat.booked = true; // Mark seat as booked
        }
    });

    // Clear selected seats and update UI
    selectedSeats = [];
    totalPrice = 0;
    updateSummary();
    countSeats();
    renderSeats(); // Re-render seats to show updated booking status
});

// Initialize the seat counts
countSeats();

// Function to render seats
function renderSeats() {
    seatsContainer.innerHTML = ''; // Clear existing seats
    seatsData.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.className = 'seat' + (seat.booked ? ' booked' : '');
        seatElement.innerHTML = `${seat.name} - $${seat.price}`;
        seatElement.dataset.price = seat.price;
        seatElement.dataset.name = seat.name;

        if (!seat.booked) {
            seatElement.addEventListener('click', () => {
                if (selectedSeats.includes(seat.name)) {
                    selectedSeats = selectedSeats.filter(s => s !== seat.name);
                    totalPrice -= seat.price;
                    seatElement.classList.remove('selected');
                } else {
                    selectedSeats.push(seat.name);
                    totalPrice += seat.price;
                    seatElement.classList.add('selected');
                }
                updateSummary();
            });
        }

        seatsContainer.appendChild(seatElement);
    });
}
