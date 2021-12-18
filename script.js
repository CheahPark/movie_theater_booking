const availableSeats = document.querySelectorAll('.row .seat:not(.occupied)');
// let selectedSeats = document.querySelectorAll('.row .seat.selected');

const movie = document.getElementById('movie');
const total = document.getElementById('total');
const count = document.getElementById('count');

const pricePerSeat = movie.value;
const availableSeatsArr = [...availableSeats];
// let selectedSeatsArr = [...selectedSeats];

let seatCounter = 0;
let totalPrice;

const displayCalculator = () => {
  const counterValue = localStorage.getItem('seatCounter');
  let priceValue = movie.options[movie.selectedIndex].value;

  priceValue = Number(priceValue);

  if (counterValue !== null || counterValue > 0) {
    count.innerHTML = counterValue;
    total.innerHTML = counterValue * priceValue;
  } else {
    count.innerHTML = 0;
    total.innerHTML = 0;
  }
};

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const counterValue = localStorage.getItem('seatCounter');

  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
        displayCalculator();
        // count.innerHTML = counterValue;
        // total.innerHTML = counterValue * total.value;
      }
    });
  }
};

const markSeat = (selectedSeat) => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  let selectedSeatsArr = [...selectedSeats];

  if (selectedSeat.classList.contains('selected')) {
    selectedSeat.classList.remove('selected');
    // seatCounter -= 1; // edit
    localStorage.removeItem('selectedSeats');
  } else {
    selectedSeat.classList.add('selected');
    // seatCounter += 1; // edit
  }
};

const updateLocalStorage = () => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  let selectedSeatsArr = [...selectedSeats];

  let seatsIndex = selectedSeatsArr.map((elem) => {
    return availableSeatsArr.indexOf(elem);
  });

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  localStorage.setItem('seatCounter', seatsIndex.length);
};

populateUI();

// When a seat is clicked, change the color and display the counter
availableSeatsArr.forEach((seat) => {
  seat.addEventListener('click', (e) => {
    const selectedSeat = e.target;
    markSeat(selectedSeat);
    updateLocalStorage();
    displayCalculator();
  });
});

// When a movie is changed, calculate the total price and display it.
movie.addEventListener('change', () => {
  updateLocalStorage();
  displayCalculator();
});
