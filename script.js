let player;

// === Test source video with subtitles ===
const testVideoOneSource = {
    hls: 'https://raw.githubusercontent.com/edgardolopez/bitmovin-player-test/refs/heads/main/videoOne/manifest.m3u8',
    title: 'Carl',
    subtitleTracks: [
        {
            url: 'https://raw.githubusercontent.com/edgardolopez/bitmovin-player-test/refs/heads/main/videoOne/vtt/vtt.srt',
            label: 'English',
            id: 'en',
            kind: 'subtitles',
            lang: 'en',
            enabled: true
        }
    ]
};

const testVideoTwoSource = {
    hls: 'https://raw.githubusercontent.com/edgardolopez/bitmovin-player-test/refs/heads/main/videoTwo/manifest.m3u8',
    title: 'Carl',
    subtitleTracks: [
        {
            url: 'https://raw.githubusercontent.com/edgardolopez/bitmovin-player-test/refs/heads/main/videoTwo/vtt/vtt.srt',
            label: 'Espanol',
            id: 'es',
            kind: 'subtitles',
            lang: 'es',
            enabled: true
        }
    ]
};

const testVideoThreeSource = {
    hls: 'https://raw.githubusercontent.com/edgardolopez/bitmovin-player-test/refs/heads/main/video/manifest.m3u8',
    title: 'Carl'
};


function initPlayer(playerElementId, playerConfig) {
    console.log('initializing player...', playerElementId);
    console.log('player config...', playerConfig);

    const playerContainer = document.getElementById(playerElementId);
    const playerInstance = new bitmovin.player.Player(playerContainer, playerConfig);

    // Add event listeners for debugging
    playerInstance.on('ready', () => {
        console.log('Player is ready');
    });

    playerInstance.on('error', (event) => {
        console.error('Player error:', event);
    });

    playerInstance.on('sourceerror', (event) => {
        console.error('Source error:', event);
    });

    playerInstance.on('play', () => {
        console.log('Play started - entering fullscreen');
    });

    console.log('Player instance created:', playerInstance);
    console.log('Player initialized');

    return playerInstance;
}

// === Load sources ===
async function loadSource(source, type, playerInstance = player) {
    try {
        console.log(`Starting to load ${type} source:`, source);

        console.log('Unloading previous source...');
        await playerInstance.unload();

        console.log('Loading new source...');
        await playerInstance.load(source);

        console.log(`${type} source loaded successfully!`);
    } catch (error) {
        console.error(`Error loading ${type}:`, error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            data: error.data
        });
        alert(`Failed to load ${type}: ${error.message || error.code || 'Unknown error'}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded...');

    // === Bitmovin player configuration ===
    const playerConfig = {
        key: 'c8783938-0606-4bcf-846d-828906104339',
        playback: { autoplay: false },
        ui: {
            enterFullscreenOnInitialPlayback: false
        }
    };

    player = initPlayer('player', playerConfig);

    document.getElementById('loadVideoOne').addEventListener('click', async () => {
        if (!player) {
            alert('Player not initialized yet');
            return;
        }

        await loadSource(testVideoOneSource, 'test video');
    });

    document.getElementById('loadVideoTwo').addEventListener('click', async () => {
        if (!player) {
            alert('Player not initialized yet');
            return;
        }
        await loadSource(testVideoTwoSource, 'test video');
    });

    document.getElementById('loadVideoThree').addEventListener('click', async () => {
        if (!player) {
            alert('Player not initialized yet');
            return;
        }
        await loadSource(testVideoThreeSource, 'test video with subtitles');
    });
});
