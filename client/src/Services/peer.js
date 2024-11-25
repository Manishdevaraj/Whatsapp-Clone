class PeerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [{
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ]
                }]
            });
        }
    }

    async getoffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(offer);
            return offer;
        }
    }

    async getanswer(offer) {
        if (this.peer) {
            console.log('Received offer:', offer);
            await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(ans);
            console.log('Created answer:', ans);
            return ans;
        }
    }

    async setLocalDescription(ans) {
        if (this.peer) {
            console.log('Setting local description:', ans);
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }
}

export default new PeerService();
