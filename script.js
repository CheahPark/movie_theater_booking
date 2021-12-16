const seats = document.querySelectorAll('.seat');
const count = document.getElementById('count');
const movie = document.getElementById('movie');
const total = document.getElementById('total');

const seatsArr = [...seats];

let seatCounter = 0;
let totalPrice;

const markSeat = (seat) => {
  if (seat.classList.contains('occupied')) {
    return;
  } else if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    seatCounter -= 1;
  } else {
    seat.classList.add('selected');
    seatCounter += 1;
  }
};

const displaySeatCounter = () => {
  count.innerHTML = seatCounter;
};

// When a seat is clicked, change the color and display the counter
seatsArr.forEach((seat) => {
  seat.addEventListener('click', () => {
    markSeat(seat);
    displaySeatCounter();
  });
});

// When a movie is changed, calculate the total price and display it.
movie.addEventListener('change', () => {
  const pricePerSeat = movie.value;
  const totalPrice = pricePerSeat * seatCounter;

  total.innerHTML = totalPrice;
});
