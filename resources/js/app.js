class Main {


	constructor() {

		this.videoOptions = {
			audio: false,
			video: {
				width: 640,
				height: 480,
				facingMode: "user"
				// facingMode: {exact: "environment"}
			}
		};
		this.video = document.getElementById('camera');
		this.frame = document.getElementById('frame');
		this.frameContext = this.frame.getContext('2d');
		

		this.tmp = document.getElementById('tmp');
		this.tmpContext = this.tmp.getContext('2d');


		this.link = document.getElementById('link');

		this.btn = document.getElementById('btn');
		this.btn.addEventListener('click', this.shot.bind(this));

		this.syncCamera();
		this.drawFrame();
	}

	syncCamera() {
		console.log(this.videoOptions);
		navigator.mediaDevices.getUserMedia(this.videoOptions)
			.then((stream) => {
				this.video.srcObject = stream;
				this.video.onloadedmetadata = (e) => {
					this.video.play();
				}
				this.video.play();
			}).catch((err) => {
				console.log(err.name + ':' + err.message);
			}
		);

	}

	drawFrame() {
		this.frameImage = new Image();
		this.frameImage.onload = () => {
			this.frameContext.clearRect(0, 0, this.frame.width, this.frame.height);
			this.frameContext.drawImage(this.frameImage, 0, 0, this.frame.width, this.frame.height);
		};
		this.frameImage.src = 'frame1.png';
	}

	shot(e) {

		this.video.pause();
		this.tmpContext.clearRect(0, 0, this.tmp.width, this.tmp.height);
		this.tmpContext.drawImage(this.video, 0, 0, this.tmp.width, this.tmp.height);
		this.tmpContext.drawImage(this.frameImage, 0, 0, this.tmp.width, this.tmp.height);
		
		this.link.href = this.tmp.toDataURL('image/png');
		this.link.download = 'filename.png';
		this.link.click();
		



	}

}

new Main();

