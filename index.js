// const apiURL = "http://127.0.0.1:5000";
const apiURL = "https://mediminder457.pythonanywhere.com";
const interval = 1000;

// Define an asynchronous function to fetch data
async function getData() {
  try {
    // Make a GET request to the Flask API
    const response = await fetch(`${apiURL}/fetch_data`, {
      method: "GET", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Inform the server about the expected response format
      },
    });

    // Parse the JSON data from the response
    const data = await response.json();

    // Log or use the data
    console.log("Received data:", data);

    const bg = document.getElementById("bg");
    const blk = document.getElementById("imgSmoke");

    //  Update the frontend with the new data
    document.getElementById("tempVal").innerText = `${data.temp}°C`;
    document.getElementById("humidVal").innerText = `${data.humid}%`;

    if (data.fire === 0) {
      document.getElementById("fireVal").innerText = `No fire detected!`;
      bg.setAttribute("class", "blk");
    } else if (data.fire === 1) {
      document.getElementById("fireVal").innerText = `Fire detected!`;
      if (blk) {
        bg.removeAttribute("class");
      }
    }

    if (data.gas === 0) {
      document.getElementById("gasVal").innerText = `No gas detected!`;
      blk.setAttribute("class", "blk");
    } else {
      document.getElementById("gasVal").innerText = `Gas detected!`;
      if (blk) {
        blk.removeAttribute("class");
      }
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
  }
}

getData();
setInterval(getData, interval);
