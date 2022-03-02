
var access_token = getParameterByName("access_token");
var background_color = getParameterByName("background_color");
let deviceId = '';

window.onSpotifyWebPlaybackSDKReady = () => {

	var player = new Spotify.Player({
		name: 'PenDancer Player',
		getOAuthToken: callback => {
			callback(access_token);
		},
		volume: 0.5
	});

	  // Ready
  player.on('ready', function (data) {
    deviceId = data.device_id;
    setTimeout(() => {
      fetch('https://api.spotify.com/v1/me/player', {
        method: "PUT",
        body: JSON.stringify({
          device_ids:[
            data.device_id
          ],
          play: false
        }),
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).catch(e => console.error(e));
    }, 100);
  });

  player.addListener('player_state_changed', (state) => {
	  console.log("ispaused " + state.paused);
	  console.log("length of it all?" + state.duration);
	  console.log("where" + state.position)
	  if (state.paused == isPlaying) {
	  	isPlaying = !state.paused;
	 	console.info(drawingObj.drawing);
	 	// send off to server from here, might do some processing here
	 	drawingObj.drawing = [];
	  }
	});
  // Connect to the player!


	const play = ({
	  spotify_uri,
	  playerInstance: {
	    _options: {
	      getOAuthToken
	    }
	  }
	}) => {
	  getOAuthToken(access_token => {
	    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
	      method: 'PUT',
	      body: JSON.stringify({ uris: [spotify_uri] }),
	      headers: {
	        'Content-Type': 'application/json',
	        'Authorization': `Bearer ${access_token}`
	      },
	    });
	  });
	};

	player.connect();
	
	document.getElementById("togglePlay").addEventListener('click', () => {
		play({playerInstance: player, spotify_uri: 'spotify:track:1jmpbnlWAtc4AJBx9GflcO',});
	});
};