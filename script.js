const availableSeats = document.querySelectorAll('.row .seat:not(.occupied)');
// let selectedSeats = document.querySelectorAll('.row .seat.selected');
const count = document.getElementById('count');
const movie = document.getElementById('movie');
const total = document.getElementById('total');

const pricePerSeat = movie.value;
const availableSeatsArr = [...availableSeats];
// let selectedSeatsArr = [...selectedSeats];

let seatCounter = 0;
let totalPrice;

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
};

populateUI();

const markSeat = (selectedSeat) => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  let selectedSeatsArr = [...selectedSeats];

  if (selectedSeat.classList.contains('selected')) {
    selectedSeat.classList.remove('selected');
    seatCounter -= 1;
    localStorage.removeItem('selectedSeats');
  } else {
    selectedSeat.classList.add('selected');
    seatCounter += 1;
  }

  localStorage.setItem('seatCounter', seatCounter);
};

const updateLocalStorage = () => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  let selectedSeatsArr = [...selectedSeats];

  let seatsIndex = selectedSeatsArr.map((elem) => {
    return availableSeatsArr.indexOf(elem);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  localStorage.setItem('seatCounter', seatsIndex.length);

  console.log(seatsIndex);
};

const displaySeatCounter = () => {
  if (
    localStorage.getItem('seatCounter') !== null ||
    localStoarge.getItem('seatCounter') > 0
  ) {
    count.innerHTML = localStorage.getItem('seatCounter');
  } else {
    count.innerHTML = 0;
  }
};

const displayPrice = () => {
  const seatCounter = localStorage.getItem('seatCounter');
  const totalPrice = pricePerSeat * seatCounter;
  // total.innerHTML = totalPrice;

  if (
    localStorage.getItem('seatCounter') !== null ||
    localStoarge.getItem('seatCounter') > 0
  ) {
    total.innerHTML = localStorage.getItem('seatCounter') * seatCounter;
  } else {
    total.innerHTML = 0;
  }
};

// When a seat is clicked, change the color and display the counter
availableSeatsArr.forEach((seat) => {
  seat.addEventListener('click', (e) => {
    const selectedSeat = e.target;
    markSeat(selectedSeat);
    displaySeatCounter();
    displayPrice();
  });
});

// When a movie is changed, calculate the total price and display it.
movie.addEventListener('change', (e) => {
  updateLocalStorage();
});
