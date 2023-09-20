// JavaScript code in your "script.js" file

document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const dialogueContainer = document.querySelector(".dialogue-container"); // The container for the dialogue box
  const anriIconContainer = document.querySelector(".anri-icon-container"); // The container for the Anri icon
  const header = document.querySelector(".audiologie-logo"); // The header element containing the Audiologie logo
  const instructions = document.querySelector(".instruction"); // The instructions element
  const youtubeVideo = document.getElementById("iframe-embed"); // The YouTube video iframe
  const dialogueBox = document.querySelector(".dialogue-box"); // The dialogue box element
  const audio = document.getElementById('test-audio'); // The audio element for testing purposes
  const junHiding = document.getElementById('jun-hiding'); // The Jun hiding element
  const preorderButton = document.getElementById('preorder-button'); // The preorder button element
  const button = document.getElementById('button'); // The button element
  const anriIcon = document.getElementById('anri-icon'); // The Anri icon element
  const junIcon = document.getElementById('jun-icon'); // The Jun icon element
  const sample = document.getElementById('sample'); // The sample element
  const loadingText = document.getElementById('loading-text'); // The loading text element
  const content = document.getElementById('content'); // The content element

  //Audio settings
  audio.volume = 0.7; // Set the volume of the audio to 70%

  // Game-related variables
  let timeoutId; // The ID of the timeout for hiding the dialogue box
  let hitCount = 0; // The number of times the "locker-slam" click box has been clicked
  let min = 1; // The minimum value for the random number generator
  let max = 7; // The maximum value for the random number generator
  let randomNum = getRandomInt(min, max); // A random number between min and max (inclusive)

  /**
 * Returns a random integer between the given minimum and maximum values (inclusive).
 * @param {number} min - The minimum value for the random number generator.
 * @param {number} max - The maximum value for the random number generator.
 * @returns {number} A random integer between min and max (inclusive).
 */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Simulates a loading screen with a progress bar and text that changes randomly.
   * @param {function} callback - The function to call after the loading simulation is complete.
   */
  function simulateLoading(callback) {
    const progressBar = document.querySelector(".progress-bar");
    loadingText.textContent = getText(randomNum); // Set the loading text to a random value
    let width = 0;
    const interval = setInterval(function () {
        if (width >= 100) {
            clearInterval(interval);
            callback();
        } else {
            width++;
            progressBar.style.width = width + "%";
        }
    }, 25);
  }

  /**
   * Returns a string of text based on the given random number.
   * @param {number} randomNum - A random number between 1 and 7 (inclusive).
   * @returns {string} A string of text based on the given random number.
   */
  function getText(randomNum) {
    switch (randomNum) {
      case 1:
        return "My main fashion style is inspired by the ABG aesthetic!";
      case 2:
        return "My hair is the color of honey milk tea!";
      case 3:
        return "The music festival I enjoyed the most was Head In The Clouds 2022.";
      case 4:
        return "My wishlist for studio gear this year is the Audeze LCD-X!";
      case 5:
        return "When I'm stressed, I eat a bánh mì and I'm good as new!";
      case 6:
        return "I'm Vietnamese-Chinese!";
      case 7:
        return "my star sign is Gemini ⭐ I can't wait to introduce someone to you...";
      default:
        return "Loading...";
    }
  }
    
  /**
   * Resizes various elements on the page based on the current viewport width.
   */
  function elementResize() {
    const viewportWidth = window.innerWidth;

    // Resize youtube video
    const widthPercentage = 0.7;
    const newWidth = viewportWidth * widthPercentage;
    const newHeight = newWidth * 0.5625;
    const borderRadius = newWidth * 0.02;
    youtubeVideo.style.width = `${newWidth}px`;
    youtubeVideo.style.height = `${newHeight}px`;
    youtubeVideo.style.borderRadius = `${borderRadius}px`;

    // Resize font size
    const fontPercentage = 0.016;
    const newFontSize = fontPercentage * viewportWidth;
    dialogueBox.style.fontSize = `${newFontSize}px`;
    instructions.style.fontSize = `${1.55 * newFontSize}px`;

    // Resize header
    const headerHeightPercentage = 0.08;
    const newHeaderHeight = headerHeightPercentage * viewportWidth;
    header.style.height = `${newHeaderHeight}px`;

    // Resize content container padding
    const contentMarginPercentage = 0.1;
    const newContentPadding = contentMarginPercentage * viewportWidth;
    content.style.marginTop = `${newContentPadding}px`;

    // Resize anri icon container
    const anriIconContainerPercentage = 0.075;
    const newAnriIconContainer = anriIconContainerPercentage * viewportWidth;
    anriIconContainer.style.width = `${newAnriIconContainer}px`;
  }

  /**
 * Hides the header element when the user scrolls down and shows it when the user scrolls up.
 */
  function autoHideHeaderSrcoll() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
      } else {
        header.style.top = "-1000px";
      }
      prevScrollpos = currentScrollPos;
    }
  }

/**
 * Plays the audio file with the given file name.
 * @param {string} filename - The name of the audio file to play.
 */
  function playAudio(filename) {
    audio.src = 'audios/' + filename + '.mp3';
    audio.play();
  }

/**
 * Sets the display property of the given element to the given value.
 * @param {HTMLElement} element - The element to set the display property of.
 * @param {string} display - The value to set the display property to.
 */
  function setDisplay(element, display) {
    element.style.display = display;
  }

/**
 * Sets the animation property of the given element to the given animation name.
 * @param {HTMLElement} element - The element to set the animation property of.
 * @param {string} animationName - The name of the animation to set.
 */
  function setAnimation(element, animationName) {
    // If the animation name is "none", set the animation property to "none"
    // Otherwise, set the animation property to the given animation name with a duration of 0.15s and an ease-in-out timing function
    animationName = animationName === "none" ? animationName : animationName + " 0.15s ease-in-out";
    element.style.animation = animationName;
  }
  
  // Show dialogue
  function showDialogue(text, clickBoxId) {
    audio.pause();
    setDisplay(anriIcon, "block");
    setDisplay(junIcon, "none");
    setDisplay(junHiding, "none");
    setAnimation(dialogueContainer, "none");

    if (clickBoxId === "locker-slam") {
      if (hitCount < 3) {
        // For the first three clicks on "locker-slam", only play sound and hide dialogue
        playAudio(clickBoxId);
        hitCount++;
      } else {
        // After the third click on "locker-slam", show dialogue and play "get-off.mp3"
        playAudio("get-off");
        clickBoxId = "get-off";
        hitCount = 0;
        text = "Whaddup dawg?";
        setDisplay(anriIcon, "none");
        setDisplay(junIcon, "block");
        setDisplay(junHiding, "block");
      }
    } else {
      // For other click-boxes, just play the audio associated with them
      playAudio(clickBoxId);
    }

    const audioFileName = `audios/${clickBoxId}.mp3`;
    const audioElement = new Audio(audioFileName);
    audioElement.load();

    audioElement.addEventListener('loadedmetadata', function() {
      const audioDurationInSeconds = audioElement.duration;
      const delayMilliseconds = audioDurationInSeconds * 1000;
      
      dialogueBox.innerText = text;
      setTimeout(function () {
        setDisplay(dialogueContainer, "flex");
        setAnimation(dialogueContainer, "fadeIn");
        setAnimation(junHiding, "fadeIn2");
      }, 10);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(function () {
        setAnimation(dialogueContainer, "fadeOut");
        setAnimation(junHiding, "fadeOut2");
        dialogueContainer.addEventListener("animationend", function() {
        setDisplay(dialogueContainer, "none");
        setAnimation(dialogueContainer, "none");
        setDisplay(junHiding, "none");
        setAnimation(junHiding, "none");
        audio.pause();
        }, { once: true });
      }, delayMilliseconds);
    });
  }
  // Event Listeners
  autoHideHeaderSrcoll();

  simulateLoading(function () {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = 0;
    content.style.display = "flex";
    setTimeout(function () {
        loadingScreen.style.display = "none";
        loadingScreen.remove();
    }, 1500);
  });

  function playRandomAudio() {
    const randomNum = getRandomInt(1, 4);
    const audioFileName = `audios/button-${randomNum}.mp3`;
    const audioElement = new Audio(audioFileName);
    if (randomNum === 3) { 
      button.setAttribute("href","https://audiologie.us/products/synthesizer-v-jun-body-pillow-case");
    } else {
      button.setAttribute("href","https://audiologie.us/products/synthesizer-v-ai-anri-digital");
    }
    audioElement.load();
    audioElement.play();
  }
  
  preorderButton.addEventListener("click", function () {
    playRandomAudio();
  });

  sample.addEventListener("click", function () {
    playAudio("sample");
  });
  
  elementResize()
  window.addEventListener('resize', elementResize);

  document.querySelectorAll(".click-box").forEach(function (clickBox) {
    clickBox.addEventListener("click", function () {
      const clickBoxId = clickBox.id;
      let textToShow = "";

      switch (clickBoxId) {
        case "locker-slam":
          textToShow = "* Hits the locker door *";
          break;
        case "rock-polaroid":
          textToShow = "Oops! That's my leggy pic.";
          break;
        case "xoxo":
          textToShow = "Stream this song if you know what's good!!";
          break;
        case "sweetwater":
          textToShow = "The representatives at Sweetwater were so sweet! They keep calling me though...";
          break;
        case "bw-poster":
          textToShow = "I snagged this poster at 'The First And Last Tour'.";
          break;
        case "anri-keychain-1":
          textToShow = "This was my outfit for Tết Nguyên Đán.";
          break;
        case "anri-keychain-2":
          textToShow = "This was what I wore for the rock photoshoot! Check out the MV next week!";
          break;
        case "keshi-poster":
          textToShow = "Ever since I heard this artist 3 years ago, I can't get his voice 'outta my head'...";
          break;
        case "keshi-polaroid":
          textToShow = "Keshi signed this one for me on the back!";
          break;
        case "gibson":
          textToShow = "Their electric guitars rocks! Get it?";
          break;
        case "keshi-polaroid-2":
          textToShow = "Gotta keep my eyes closed for that... mhmm";
          break;
        case "skull":
          textToShow = "All I ever wanna do is burn it all down!";
          break;
        case "baseball":
          textToShow = "I'm actually not sure why this is here... hmmm...";
          break;
        case "platinum":
          textToShow = "Certified Platinum!";
          break;
        case "guitar-keychain":
          textToShow = "Anh took this from me the other day. Glad to have it back!";
          break;
        case "akem":
          textToShow = "Akem was like the camera wizard, always catching me from my best angles!";
          break;
        case "kungom":
          textToShow = "KUNGOM totally yassified my locker! What an artist!";
          break;
        case "calendar":
          textToShow = "My next live is on October 14th...There's still so much I need to practice...";
          break;
        case "acrylic-standee":
          textToShow = "I got this new custom acrylic standee made recently. It looks hella cute, don't you think?";
          break;
        case "gift-box":
          textToShow = "My number 1 fan surprised me with this... It was so sweet of him!";
          break;
        case "sv-box":
          textToShow = "The box cover photoshoot was a blast! I hope my energy was captured well.";
          break;
        case "mic":
          textToShow = "My trusty, go-to microphone for live performances!";
          break;
        case "barbie-pic":
          textToShow = "Girls' day with Teto! Anh Duy kept begging to join us, it was kinda annoying.";
          break;          
        case "mode-v":
          textToShow = "This vocal mode is filled with life and color, not dull or timid.";
          break;
        case "mode-e":
          textToShow = "This mode is where sound meets its boundary with an attitude, I was inspired by Gerard Way!";
          break;
        case "mode-d":
          textToShow = "This vocal mode is the shadowy side of sound, where mysteries and secrets hide.";
          break;
        case "mode-c":
          textToShow = "This vocal mode is the opposite of blurry. Easy to hear and understand.";
          break;
        case "mode-p-1":
          textToShow = "A mode with a full, strong tone. My vocal inspiration for it was Queen Bey!";
          break;
        case "mode-f":
          textToShow = 'This mode is specially designed for melodic rap. "She hit the ___ , next thing you know."';
          break;
        case "mode-w":
          textToShow = "This vocal mode is a soft spoken secret, a hushed tone in the air.";
          break;
        case "mode-s-1":
          textToShow = 'この"ボーカルスタイル"の花言葉は、「小さな幸せ」、「誠実」、「謙虚」。';
          break;
        case "mode-m":
          textToShow = "This mode sounds gentle and laid-back... you may need to view it from a different angle...";
          break;
        case "mode-s-2":
          textToShow = "This vocal mode has a solemn and grave tone, not to be taken lightly.";
          break;
        case "mode-p-2":
          textToShow = "This mode is associated with royalty and is also a nickname for 'Aaliyah'!";
          break;
        default:
          textToShow = "Did you know Jun's birthday is coming up?";
      }
      showDialogue(textToShow, clickBoxId);
    });
  });
});

