const bg = document.getElementById("bg");
const bgbo = document.getElementById("bgbo");
var image = 0

bg.addEventListener("animationend", () => {
    bgbo.style.animationName = "fadein";
    if (image < 2) {
      image = image + 1;
    } else {
      image = 0;
    };
    console.log(image)
  });

  bgbo.addEventListener("animationend", () => {
    trans();
    bgbo.style.animationName = "fadeout";
  });

function trans() {
    switch (image) {
        case 0:
            bg.style.animationName = "moveZoo";
            bg.style.backgroundImage = "url('Assets/BGs/Zoo.png')";
            break;
        case 1:
            bg.style.animationName = "moveAnt";
            bg.style.backgroundImage = "url('Assets/BGs/Magicant.png')";
            bg.style.animationDuration = "36s"
            break;
        case 2:
            bg.style.animationName = "moveDer";
            bg.style.backgroundImage = "url('Assets/BGs/Reindeer.png')";
            bg.style.animationDuration = "28s"
            break;
        case 3:
          image = 0;
          break;
    }

}

