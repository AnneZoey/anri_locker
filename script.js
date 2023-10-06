// JavaScript code in your "script.js" file

document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const dialogueContainer = document.querySelector(".dialogue-container"); // The container for the dialogue box
  const anriIconContainer = document.querySelector(".anri-icon-container"); // The container for the Anri icon
  const header = document.querySelector(".audiologie-logo"); // The header element containing the Audiologie logo
  const instructions = document.querySelector(".instruction"); // The instructions element
  const youtubeVideo = document.getElementById("iframe-embed"); // The YouTube video iframe
  const dialogueBox = document.querySelector(".dialogue-box"); // The dialogue box element
  const junHiding = document.getElementById("jun-hiding"); // The Jun hiding element
  const preorderButton = document.getElementById("preorder-button"); // The preorder button element
  const button = document.getElementById("button"); // The button element
  const anriIcon = document.getElementById("anri-icon"); // The Anri icon element
  const junIcon = document.getElementById("jun-icon"); // The Jun icon element
  const sample = document.getElementById("sample"); // The sample element
  const loadingText = document.getElementById("loading-text"); // The loading text element
  const content = document.getElementById("content"); // The content element
  const showPhoneButton = document.querySelector(".show-phone-button"); // The show phone button element
  const hidePhoneButton = document.querySelector(".hide-phone-button"); // The hide phone button element
  const phone = document.querySelector(".phone-item-container");
  const clock = document.getElementById("clock");
  const nameTitle = document.querySelector(".name h1");
  const rulesContainer = document.querySelector(".rules-container");
  const rulesContainerh1 = document.querySelector(".rules-container h1");
  const rulesContainerlist = document.querySelector(".rules-container ol");
  const rulesContainerItem = document.querySelectorAll(".rules-container li");
  const rulesContainterh2 = document.querySelectorAll(".rules-container h2");
  const rulesContainerh3 = document.querySelectorAll(".rules-container h3");

  // Game-related variables
  let timeoutId; // The ID of the timeout for hiding the dialogue box
  let hitCount = 0; // The number of times the "locker-slam" click box has been clicked
  let min = 1; // The minimum value for the random number generator
  let max = 10; // The maximum value for the random number generator
  let randomNum = getRandomInt(min, max); // A random number between min and max (inclusive)
  let currentAudioElement = null; // The currently playing audio element
  let junAppeared = false; // Whether or not Jun has appeared
  let currentLanguage = "eng"; // The currently selected language

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
   * Generates a click indicator element at the specified x and y coordinates.
   * @param {number} x - The x-coordinate of the click event.
   * @param {number} y - The y-coordinate of the click event.
   */
  function generateClickIndicator(x, y, suffix) {
    // Create a new div element to hold the click indicator image.
    const clickIndicator = document.createElement("div");

    // Create a new img element to display the click indicator image.
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", "assets/click-indicator.png");
    imageElement.setAttribute("id", `click-indicator-img${suffix}`);
    clickIndicator.appendChild(imageElement);

    // Add the click-indicator class to the div element and position it at the specified x and y coordinates.
    clickIndicator.classList.add(`click-indicator${suffix}`);
    clickIndicator.style.left = `${x}px`;
    clickIndicator.style.top = `${y + window.pageYOffset}px`;
    clickIndicator.style.zIndex = "9999";
    document.body.appendChild(clickIndicator);

    // Add an event listener to the click indicator element that removes it from the DOM when the animation ends.
    clickIndicator.addEventListener("animationend", function () {
      document.body.removeChild(clickIndicator);
    });
  }

  // Add a click event listener to the document that generates a click indicator at the clicked location.
  document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;
    generateClickIndicator(x, y, 0); // Creates a click indicator with suffix 0
    generateClickIndicator(x, y, 1); // Creates a click indicator with suffix 1
    generateClickIndicator(x, y, 2); // Creates a click indicator with suffix 2
  });

  // This function updates the clock with the current time
  function updateClock() {
    let date = new Date(); // Get the current date and time
    let hours = date.getHours(); // Get the current hour
    let minutes = date.getMinutes(); // Get the current minute

    // If the minute is less than 10, add a leading zero to it
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Set the text content of the clock element to the current time
    clock.textContent = `${hours}:${minutes}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // This function shows the phone by setting its display to 'flex' and animating it with a slideIn animation
  function showPhone() {
    phone.style.display = "flex";
    phone.style.animation = "slideIn 0.2s ease";
    showPhoneButton.style.display = "none"; // Hide the showPhoneButton
  }

  // This function hides the phone by animating it with a slideOut animation and setting its display to 'none'
  function hidePhone() {
    phone.style.animation = "slideOut 0.3s ease";
    setTimeout(function () {
      phone.style.display = "none";
      showPhoneButton.style.display = "flex"; // Show the showPhoneButton
      showPhoneButton.style.animation = "slideIn 0.2s ease";
    }, 300); // Wait for 300ms before hiding the phone and showing the showPhoneButton
  }

  hidePhoneButton.addEventListener("click", hidePhone);
  showPhoneButton.addEventListener("click", showPhone);

  /**
   * Returns a string of text based on the given random number.
   * @param {number} randomNum - A random number.
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
        return "I'm mixed Vietnamese-Chinese born American!";
      case 7:
        return "My star sign is Gemini ⭐ I can't wait to introduce someone to you...";
      case 8:
        return "Chachamaru's name is inspired by the hitmaker Cha Cha Malone!";
      case 9:
        return "You can check out my personal music playlist on my phone!";
      case 10:
        return "I can sing in different languages! Check out my bio for a taste!";
      default:
        return "Loading...";
    }
  }

  /**
   * Changes the style of the selected language button and updates the title based on the selected language.
   * @param {string} language - The selected language.
   */
  function changeLanguageStyle(language) {
    // Update the title based on the selected language.
    updateTitle(nameTitle, language);
    // Select all the language buttons.
    const languageButtons = document.querySelectorAll(".language-container");
    // Loop through each language button.
    languageButtons.forEach((languageButton) => {
      // Set the background color and text color of the button based on whether its id matches the selected language.
      languageButton.style.backgroundColor =
        languageButton.id === language ? "bisque" : "";
      languageButton.style.color =
        languageButton.id === language ? "black" : "bisque";
    });
  }

  /**
   * Updates the scroll box content based on the selected language.
   * @param {string} language - The selected language.
   */
  function changeLanguage(language) {
    // Select the scroll box content element.
    const scrollBoxContent = document.querySelector(".scroll-box-content p");
    // Use a switch statement to update the scroll box content based on the selected language.
    switch (language) {
      case "eng":
        scrollBoxContent.textContent =
          "Airi Lin, also known by her stage name of “ANRI”, joined AO in 2021 and debuted with “PROGRAMMED 2 LOVE” in the same year. She is a kind young lady with a warm and dynamic personality. When she sets a goal, she pursues it with single-minded determination. In her free time, she enjoys songwriting, musical production, and spending time with her pet guinea pig Chachamaru.";
        break;
      case "vie":
        scrollBoxContent.textContent =
          "Airi Lin hay còn được biết đến với nghệ danh “ANRI”. Cô gia nhập AO và ra mắt với bài hát đầu tiên “PROGRAMMED 2 LOVE” vào năm 2021. Cô ấy là một cô gái thân thiện, năng động và đầy đam mê với âm nhạc. Khi đặt ra mục tiêu mới, cô ấy sẽ theo đuổi nó đến cùng với tất cả tâm huyết của mình. Khi rảnh rỗi, cô ấy thích sáng tác, sản xuất âm nhạc và dành thời gian cho chú chuột cưng của mình, em ấy tên là Chachamaru.";
        break;
      case "jpn":
        scrollBoxContent.textContent =
          "ANRIの芸名でも知られるAiri Linは、2021年にAOに加入し、同年に「PROGRAMMED 2 LOVE」でデビューした。温厚で活発な性格の優しい女性だ。目標を決めたら一心不乱に突き進む。趣味は作詞作曲、音楽制作、ペットのモルモット「Chachamaru」と過ごすこと。";
        break;
      case "kor":
        scrollBoxContent.textContent =
          "안리(ANRI)의 예명으로도 알려진 Airi Lin은, 2021년 AO에 가입해, 같은 해 「PROGRAMMED 2 LOVE」로 데뷔했습니다. 그녀는 온후하고 활발한 성격의 상냥한 여성이며 목표를 정하고 한번 시작하면 끝을 보는 성격입니다. 취미는 작사작곡, 음악 제작, 기니피그 애완동물인「Chachamaru」와 보내는 것 입니다.";
        break;
      case "chn":
        scrollBoxContent.textContent =
          "铃爱莉，网名“ANRI”，于2021年加入AO，同年以《PROGRAMMED 2 LOVE》出道。她是一位心地善良的少女，性格热情而充满活力。当她设定目标时，她就会一心一意地追求它。在空闲时间，她喜欢歌曲创作、音乐制作，并与她的宠物豚鼠《茶茶丸》 共度时光。";
        break;
      default:
        scrollBoxContent.textContent = "test";
    }
  }

  const languageTitles = {
    eng: "ANRI",
    jpn: "杏里",
    kor: "안리",
    chn: "铃爱莉",
  };

  /**
   * Updates the title based on the selected language.
   * @param {HTMLElement} titleElement - The title element to update.
   * @param {string} language - The selected language.
   */
  function updateTitle(titleElement, language) {
    titleElement.textContent = languageTitles[language] || "ANRI";
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

    // Resize rules container
    const rulesContainerPercentage = 0.6;
    const newRulesContainer = rulesContainerPercentage * viewportWidth;
    rulesContainer.style.width = `${newRulesContainer}px`;
    rulesContainer.style.borderRadius = `${newRulesContainer * 0.02}px`;

    // Resize rules container h1
    const rulesContainerh1Percentage = 0.04;
    const newRulesContainerh1 = rulesContainerh1Percentage * viewportWidth;
    rulesContainerh1.style.fontSize = `${newRulesContainerh1}px`;

    // Resize rules container h2
    const rulesContainterh2Percentage = 0.025;
    const newRulesContainterh2 = rulesContainterh2Percentage * viewportWidth;
    rulesContainterh2.forEach((h2) => {
      h2.style.fontSize = `${newRulesContainterh2}px`;
    });

    // Resize rules container h3
    const rulesContainerh3Percentage = 0.02;
    const newRulesContainerh3 = rulesContainerh3Percentage * viewportWidth;
    rulesContainerh3.forEach((h3) => {
      h3.style.fontSize = `${newRulesContainerh3}px`;
    });

    // Resize rules container list
    const rulesContainerlistPercentage = 0.02;
    const newRulesContainerlist = rulesContainerlistPercentage * viewportWidth;
    rulesContainerlist.style.fontSize = `${newRulesContainerlist}px`;

    // Add padding to li items
    const rulesContainerItemPercentage = 0.01;
    const newRulesContainerItem = rulesContainerItemPercentage * viewportWidth;
    rulesContainerItem.forEach((item) => {
      item.style.paddingBottom = `${newRulesContainerItem}px`;
    });

    //remove padding for the last li item
    rulesContainerItem[rulesContainerItem.length - 1].style.paddingBottom = 0;

    // make sure that the text has a maximum size
    if (newRulesContainerh1 > 60) {
      rulesContainerh1.style.fontSize = "60px";
    }

    if (newRulesContainterh2 > 40) {
      rulesContainterh2.forEach((h2) => {
        h2.style.fontSize = "40px";
      });
    }

    if (newRulesContainerh3 > 30) {
      rulesContainerh3.forEach((h3) => {
        h3.style.fontSize = "30px";
      });
    }

    if (newRulesContainerlist > 30) {
      rulesContainerlist.style.fontSize = "30px";
    }

    if (newRulesContainerItem > 20) {
      rulesContainerItem.forEach((item) => {
        item.style.paddingBottom = "20px";
      });
    }

    // Set maximum width of rules-container to 800px
    if (newRulesContainer > 900) {
      rulesContainer.style.width = "900px";
      rulesContainer.style.borderRadius = "16px";
    }
  }

  /**
   * Hides the header element when the user scrolls down and shows it when the user scrolls up.
   */
  function autoHideHeaderSrcoll() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
      } else {
        header.style.top = "-1000px";
      }
      prevScrollpos = currentScrollPos;
    };
  }

  /**
   * Plays the given audio element and pauses any currently playing audio.
   * @param {HTMLAudioElement} audioElement - The audio element to play.
   */
  function playAudio(audioElement) {
    // Pause any currently playing audio
    if (currentAudioElement !== null) {
      currentAudioElement.pause();
    }
    // Play the new audio element
    currentAudioElement = audioElement;
    audioElement.play();
  }

  function getAudio(filename) {
    let audioFileName = `audios/${filename}.mp3`;
    let audioElement = new Audio(audioFileName);
    return audioElement;
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
    animationName =
      animationName === "none"
        ? animationName
        : animationName + " 0.15s ease-in-out";
    element.style.animation = animationName;
  }

  /**
   * Plays a random audio file and sets the href of the button element based on the random number generated.
   */
  function playRandomAudio() {
    const randomNum = getRandomInt(1, 3); // Generate a random number between 1 and 3 (inclusive)
    const audioFileName = `audios/button-${randomNum}.mp3`; // Construct the file name of the audio file to play
    const audioElement = new Audio(audioFileName); // Create a new Audio object with the file name
    button.setAttribute(
      "href",
      "https://audiologie.us/products/synthesizer-v-ai-anri-digital"
    );
    audioElement.load(); // Load the audio file
    audioElement.play(); // Play the audio file
  }

  /**
   * Shows a dialogue box with the given text and plays the audio associated with the given click box ID.
   * @param {string} text - The text to display in the dialogue box.
   * @param {string} clickBoxId - The ID of the click box that was clicked.
   */
  function showDialogue(text, clickBoxId) {
    audioElement = getAudio(clickBoxId);
    audioElement.load();
    setDisplay(anriIcon, "block"); // Show the Anri icon
    setDisplay(junIcon, "none"); // Hide the Jun icon
    setDisplay(junHiding, "none"); // Hide the Jun hiding element
    setAnimation(dialogueContainer, "none"); // Reset the animation of the dialogue container

    audioElement.addEventListener("loadedmetadata", function () {
      let audioDurationInSeconds = audioElement.duration;
      let delayMilliseconds = audioDurationInSeconds * 1000 + 500;

      if (clickBoxId === "locker-slam") {
        if (hitCount < 3) {
          // For the first three clicks on "locker-slam", only play sound and hide dialogue
          playAudio(audioElement);
          hitCount++;
        } else {
          // After the third click on "locker-slam", show dialogue and play "get-off.mp3"
          clickBoxId = "get-off";
          audioElement = getAudio(clickBoxId);
          audioElement.load();
          playAudio(audioElement);
          hitCount = 0;
          text = "Whaddup dawg?";
          junAppeared = true;
          setDisplay(anriIcon, "none"); // Hide the Anri icon
          setDisplay(junIcon, "block"); // Show the Jun icon
          setDisplay(junHiding, "block"); // Show the Jun hiding element
        }
      } else {
        // For other click-boxes, just play the audio associated with them
        playAudio(audioElement);
      }

      dialogueBox.innerText = text;
      setTimeout(function () {
        setDisplay(dialogueContainer, "flex"); // Show the dialogue container
        setAnimation(dialogueContainer, "fadeIn"); // Fade in the dialogue container
        setAnimation(junHiding, "fadeIn2"); // Fade in the Jun hiding element
      }, 10);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(function () {
        setAnimation(dialogueContainer, "fadeOut"); // Fade out the dialogue container
        setAnimation(junHiding, "fadeOut2"); // Fade out the Jun hiding element
        dialogueContainer.addEventListener(
          "animationend",
          function () {
            setDisplay(dialogueContainer, "none"); // Hide the dialogue container
            setAnimation(dialogueContainer, "none"); // Reset the animation of the dialogue container
            setDisplay(junHiding, "none"); // Hide the Jun hiding element
            setAnimation(junHiding, "none"); // Reset the animation of the Jun hiding element
            if (junAppeared) {
              window.open(
                "https://audiologie.us/products/synthesizer-v-jun-body-pillow-case",
                "_blank"
              );
              junAppeared = false;
            }
            audioElement.pause(); // Pause the audio
          },
          { once: true }
        );
      }, delayMilliseconds);
    });
  }

  // Event Listeners and function calls
  // Call the autoHideHeaderSrcoll function to hide the header element when the user scrolls down and show it when the user scrolls up
  autoHideHeaderSrcoll();

  // Simulate a loading screen with a progress bar and text that changes randomly
  simulateLoading(() => {
    // After the loading simulation is complete, fade out the loading screen and display the content
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = 0;
    content.style.display = "flex";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      loadingScreen.remove();
    }, 1500);
  });

  // Add a click event listener to the preorder button that plays a random audio file and sets the href of the button element based on the random number generated
  preorderButton.addEventListener("click", function () {
    playRandomAudio();
  });

  // Add a click event listener to the sample element.
  sample.addEventListener("click", function () {
    // Construct the file name of the audio file based on the current language.
    let audioFileName = `audios/anri-sample/${currentLanguage}-sample.mp3`;

    // Create a new Audio object and load the audio file.
    let audioElement = new Audio(audioFileName);
    audioElement.load();

    // Call the playAudio function to play the audio file.
    playAudio(audioElement);
  });

  // Call the elementResize function to resize various elements on the page based on the current viewport width
  elementResize();

  // Add a resize event listener to the window that calls the elementResize function when the window is resized
  window.addEventListener("resize", elementResize);

  // Add a click event listener to each app container element
  document.querySelectorAll(".app-container").forEach(function (appContainer) {
    appContainer.addEventListener("click", function () {
      const appContainerId = appContainer.id;
      switch (appContainerId) {
        case "yt-app":
          window.open("https://www.youtube.com/@AUDIOLOGIE", "_blank");
          break;
        case "ao-app":
          window.open("https://audiologie.us/", "_blank");
          break;
        case "tw-app":
          window.open("https://twitter.com/audiologie_en?lang=en", "_blank");
          break;
        case "sc-app":
          window.open("https://soundcloud.com/audiologie_en", "_blank");
          break;
        default:
          window.open("https://www.youtube.com/@AUDIOLOGIE", "_blank");
      }
    });
  });

  // Add a click event listener to each language container.
  document
    .querySelectorAll(".language-container")
    .forEach(function (languageContainer) {
      // When a language container is clicked, get its id and pass it to the changeLanguageStyle and changeLanguage functions.
      languageContainer.addEventListener("click", function () {
        const languageContainerId = languageContainer.id;
        currentLanguage = languageContainerId;
        changeLanguageStyle(languageContainerId);
        changeLanguage(languageContainerId);
      });
    });

  // Set the initial language to English.
  changeLanguage("eng");
  changeLanguageStyle("eng");

  // Add a click event listener to each click box element
  document.querySelectorAll(".click-box").forEach(function (clickBox) {
    clickBox.addEventListener("click", function () {
      const clickBoxId = clickBox.id;
      let textToShow = "";

      switch (clickBoxId) {
        case "locker-slam":
          textToShow = "* Hits the locker door *";
          break;
        case "ippotsk":
          textToShow =
            "I saw ippo.tsk played the the guitar once. It was nice until he broke a string :(";
          break;
        case "marvin":
          textToShow =
            "I broke Marvin's drums one time during our recording session... I hope he isn't mad at me... ";
          break;
        case "mode-s-3":
          textToShow =
            "This vocal mode shares a name with the mascot of Wildfire Prevention!";
          break;
        case "rock-polaroid":
          textToShow = "Oops! That's my leggy pic.";
          break;
        case "xoxo":
          textToShow = "Stream this song if you know what's good!!";
          break;
        case "sweetwater":
          textToShow =
            "The representatives at Sweetwater were so sweet! They keep calling me though...";
          break;
        case "bw-poster":
          textToShow = "I snagged this poster at 'The First And Last Tour'.";
          break;
        case "anri-keychain-1":
          textToShow = "This was my outfit for Tết Nguyên Đán.";
          break;
        case "anri-keychain-2":
          textToShow =
            "This was what I wore for the rock photoshoot! Check out the MV next week!";
          break;
        case "keshi-poster":
          textToShow =
            "Ever since I heard this artist 3 years ago, I can't get his voice 'outta my head'...";
          break;
        case "keshi-polaroid":
          textToShow = "Keshi signed this one for me on the back!";
          break;
        case "gibson":
          textToShow = "Their electric guitars rock! Get it?";
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
          textToShow =
            "Anh took this from me the other day. Glad to have it back!";
          break;
        case "akem":
          textToShow =
            "Akem was like the camera wizard, always catching me from my best angles!";
          break;
        case "kungom":
          textToShow = "KUNGOM totally yassified my locker! What an artist!";
          break;
        case "calendar":
          textToShow =
            "My next live is on October 14th...There's still so much I need to practice...";
          break;
        case "acrylic-standee":
          textToShow =
            "I got this new custom acrylic standee made recently. It looks hella cute, don't you think?";
          break;
        case "gift-box":
          textToShow =
            "My number 1 fan surprised me with this... It was so sweet of him!";
          break;
        case "sv-box":
          textToShow =
            "The box cover photoshoot was a blast! I hope my energy was captured well.";
          break;
        case "mic":
          textToShow = "My trusty, go-to microphone for live performances!";
          break;
        case "barbie-pic":
          textToShow =
            "Girls' day with Teto! Anh Duy kept begging to join us, it was kinda annoying.";
          break;
        case "mode-v":
          textToShow =
            "This vocal mode is filled with life and color, not dull or timid.";
          break;
        case "mode-e":
          textToShow =
            "This mode is where sound meets its boundary with an attitude, I was inspired by Gerard Way!";
          break;
        case "mode-d":
          textToShow =
            "This vocal mode is the shadowy side of sound, where mysteries and secrets hide.";
          break;
        case "mode-c":
          textToShow =
            "This vocal mode is the opposite of blurry. Easy to hear and understand.";
          break;
        case "mode-p-1":
          textToShow =
            "A mode with a full, strong tone. My vocal inspiration for it was Queen Bey!";
          break;
        case "mode-f":
          textToShow =
            'This mode is specially designed for melodic rap. "She hit the ___ , next thing you know."';
          break;
        case "mode-w":
          textToShow =
            "This vocal mode is a soft spoken secret, a hushed tone in the air.";
          break;
        case "mode-s-1":
          textToShow =
            'この"ボーカルスタイル"の花言葉は、「小さな幸せ」、「誠実」、「謙虚」。';
          break;
        case "mode-m":
          textToShow =
            "This mode sounds gentle and laid-back... you may need to view it from a different angle...";
          break;
        case "mode-s-2":
          textToShow =
            "This vocal mode has a solemn and grave tone, not to be taken lightly.";
          break;
        case "mode-p-2":
          textToShow =
            "This mode is associated with royalty and is also a nickname for 'Aaliyah'!";
          break;
        default:
          textToShow = "Did you know Jun's birthday is coming up?";
      }
      showDialogue(textToShow, clickBoxId);
    });
  });
});
