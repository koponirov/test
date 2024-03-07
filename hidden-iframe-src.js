console.log('[iframe loaded]')

const parentWindowUrl = 'https://web-push-70b46.web.app/'

const doFetch = () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Send the data received from the API back to the parent window

      console.log(`[iframe] response data: ${data}`)
      event.source.postMessage(data, parentWindowUrl);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
  

// Function to handle receiving messages from the parent window
function handleMessage(event) {
  // Check if the message is from the parent window
  if (event.origin !== parentWindowUrl) {
    console.log(`[iframe] message ignored origin: ${event.origin}`)
    // Ignore messages from unexpected origins
    return;
  }

  // Log the message received from the parent window
  console.log('Received message from parent:', event.data);
  // Do something with the message, such as sending a fetch request
  doFetch()
  
}

// Add event listener to listen for messages from the parent window
window.addEventListener('message', handleMessage);

doFetch()
