/** 
 * Shared worker for timer and entire drawing. 
 * Start recording controlled from Spotify playback API calls.
 * - gets total time from starting call
 * - gets a pause time elapsed checking from pause call
 * - gets a stop call
 * 
 * @param total time, current time elapsed = 0,
 * @return completed array of movements and coordinates
 * 
 * Sends off competed array to storage/analysis.
 * 
 */




onmessage = function(e) {
	let x = e.data[0];
	let y = e.data[1];
}