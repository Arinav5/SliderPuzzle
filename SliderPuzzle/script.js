//setup
moves = document.getElementById("moves")
grid = document.querySelector(".grid");
whereWhite = 0;
moveCount = 0;
const mountain = [
    {
      id: 0,
      temp: 0,
      img: 'images/m1.jpg'
    },
    {
      id: 1,
      temp: 1,
      img: 'images/m2.jpg'
    },
    {
      id: 2,
      temp: 2,
      img: 'images/m3.jpg'
    },
    {
      id: 3,
      temp: 3,
      img: 'images/m4.jpg'
    },
    {
      id: 4,
      temp: 4,
      img: 'images/m5.jpg'
    },
    {
      id: 5,
      temp: 5,
      img: 'images/m6.jpg'
    },
    {
      id: 6,
      temp: 6,
      img: 'images/m7.jpg'
    },
    {
      id: 7,
      temp: 7,
      img: 'images/m8.jpg'
    },
    {
      id: 8,
      temp: 8,
      img: 'images/m9.jpg'
    },
    {
      id: 9,
      temp: 9,
      img: 'images/m10.jpg'
    },
    {
      id: 10,
      temp: 10,
      img: 'images/m11.jpg'
    },
    {
      id: 11,
      temp: 11,
      img: 'images/m12.jpg'
    },
    {
      id: 12,
      temp: 12,
      img: 'images/m13.jpg'
    },
    {
      id: 13,
      temp: 13,
      img: 'images/m14.jpg'
    },
    {
      id: 14,
      temp: 14,
      img: 'images/m15.jpg'
    },
    {
      id: 15,
      temp: 15,
      img: 'images/m16.jpg'
    }
]
const temp = [
    {
      id: 0,
      temp: 0,
      img: 'images/m1.jpg'
    },
    {
      id: 1,
      temp: 1,
      img: 'images/m2.jpg'
    },
    {
      id: 2,
      temp: 2,
      img: 'images/m3.jpg'
    },
    {
      id: 3,
      temp: 3,
      img: 'images/m4.jpg'
    },
    {
      id: 4,
      temp: 4,
      img: 'images/m5.jpg'
    },
    {
      id: 5,
      temp: 5,
      img: 'images/m6.jpg'
    },
    {
      id: 6,
      temp: 6,
      img: 'images/m7.jpg'
    },
    {
      id: 7,
      temp: 7,
      img: 'images/m8.jpg'
    },
    {
      id: 8,
      temp: 8,
      img: 'images/m9.jpg'
    },
    {
      id: 9,
      temp: 9,
      img: 'images/m10.jpg'
    },
    {
      id: 10,
      temp: 10,
      img: 'images/m11.jpg'
    },
    {
      id: 11,
      temp: 11,
      img: 'images/m12.jpg'
    },
    {
      id: 12,
      temp: 12,
      img: 'images/m13.jpg'
    },
    {
      id: 13,
      temp: 13,
      img: 'images/m14.jpg'
    },
    {
      id: 14,
      temp: 14,
      img: 'images/m15.jpg'
    },
    {
      id: 15,
      temp: 15,
      img: 'images/m16.jpg'
    }
]
shuffled = shuffle(mountain);


//sets up the game when it first starts
function initialize(array)
{
  for (let i = 0; i<array.length; i++)
  {
    var img = document.createElement('img');
    img.addEventListener('click', moveSquare)
    img.setAttribute('src', array[i].img)
    img.setAttribute('id', array[i].id)
    grid.appendChild(img);
  }
  moves.innerHTML = moveCount;
}
//Randomly shuffles an array
//I know the directions on the sheet said to allow the user to shuffle manually but I thought it would be more interesting to have it shuffle automatically. 
function shuffle(array)
{
  for(i = 0; i<1000; i++)
  {
    randomIndex = Math.floor(Math.random() * 15);
    array[randomIndex].id = randomIndex + 1;
    array[randomIndex + 1].id = randomIndex;
    [array[randomIndex], array[randomIndex + 1]] = [array[randomIndex + 1], array[randomIndex]];
  }
  return array;
}
//checks if a specified square is next to a white square
function isadjWhite(index)
{
  whereWhite = -1;
  for(i = 0; i<shuffled.length; i++)
  {
    if(shuffled[i].img === "images/m16.jpg")
    {
      whereWhite = i;
    }
  }
  if(index + 4 === whereWhite) return true;
  if(index - 4 === whereWhite) return true;
  if(index - 1 === whereWhite && index % 4 != 0) return true; 
  if(index + 1 === whereWhite && index != 3 && index != 7 && index != 11 && index != 15) return true;
  else
  {
    return false;
  }
}
//moves the square
function moveSquare()
{
  isMovable = isadjWhite(parseInt(this.getAttribute('id')));
  curInd = parseInt(this.getAttribute('id'));
  
  if(isMovable)
  {
    moveCount++;
    shuffled[curInd].id = whereWhite;
    [shuffled[curInd], shuffled[whereWhite]] = [
    shuffled[whereWhite], shuffled[curInd]]
    display(shuffled);
  }
}
//displays the moved squares
function display(array)
{
  removeAllChildNodes(grid);
  initialize(array);
  moves.innerHTML = moveCount;
  if(hasWon())
  {
    alert("You completed the puzzle with " + moveCount + " moves!");
  }
}
//removes all of the images so that the game change each time a square is moved
function removeAllChildNodes(parent) 
{
    while (parent.firstElementChild) {
      parent.removeChild(parent.firstElementChild);
    }
    nodeCounter = 0;
}
//checks if the player won after each move
function hasWon()
{
  for(i = 0; i < temp.length; i++)
  {
    if(temp[i].temp != shuffled[i].temp)
    {
      return false; 
    }
  }
  return true;
}
//resets the game
function reset()
{
  moveCount = 0;
  shuffled = shuffle(mountain);
  display(temp);
}
