<template>
  <div class="template-container">
   <div class="row">
  <div class="col-12 text-center p-2 pb-3">
    <div class="pt-3">
      <router-link to="/adminpage">
        <img id="logo" src="../assets/pictures/logo.png" alt="">
      </router-link><br>
      <p class="label">Scan System</p>
    </div>
  </div>
  <div class="col-12">
    <div v-if="showCamera" class="camera">
      <video ref="video" autoplay></video>
      <canvas ref="canvas" style="display:none;"></canvas>
    </div>
  </div>
</div>
   
    <div v-if="showResult" class="result">
      <div v-if="eventData" class="mt-3">
      <p><b>Esemény neve: </b><br> {{ eventData.event_name || "Nincs olvasható adat" }}</p><hr>
      <p><b>Esemény dátuma:</b><br> {{ eventData.event_date || "Nincs olvasható adat"}}</p><hr>
      <p><b>Felhasználó neve:</b><br> {{ eventData.user_name || "Nincs olvasható adat"}}</p><hr>
      <p><b>Felhasználó szül. idő:</b><br> {{ eventData.user_birhdate || "Nincs olvasható adat"}}
        <span class="userage" v-if="eventData && eventData.user_birhdate">({{ getAge(eventData.user_birhdate) }} éves)</span>
      </p><hr>      <p><b>Belépőkód:</b><br> {{ eventData.user_pass || "Nincs olvasható adat"}}</p><hr>
    </div>
     <div class="container">
       <div class="row">
         <div class="col-12">
           <div class="text-center">
             <button class="btn btn-info btn-goevent fixed-bottom pt-2" @click="restartScanner">ÚJ KÓD BEOLVASÁSA</button>
           </div>
         </div>
       </div>
     </div>
     </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';

export default {
  name: 'QRCodeReader',
  data() {
    return {
      showCamera: true,
      showResult: false,
      qrCodeContent: null,
      eventData:null,
      wrongData:null
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    startCamera() {
      QrScanner.WORKER_PATH = 'qr-scanner-worker.min.js';
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const scanner = new QrScanner(video, (result) => {
        scanner.stop();
        this.showResult = true;
        this.showCamera = false;
        this.qrCodeContent = result;
        this.fetchData(result);
      });
      QrScanner.hasCamera().then(hasCamera => {
        if (!hasCamera) {
          console.error('No camera found');
          return;
        }
        scanner.start();
      });
    },

    async fetchData(qrCodeContent) {
  try {
    const response = await axios.get(`/eventpass/${qrCodeContent}`);
    if (response.data.length > 0) {
      this.eventData = response.data[0];
      this.wrongData = null;
    } else {
      this.eventData = null;
      this.wrongData = "Érvénytelen belépési azonosító!";
    }
  } catch (error) {
    console.error(error);
  }
},
    restartScanner() {

  location.reload();
},
 getAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
  },
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

/* beállítja a tartalom maximális méretét a kijelző méretére */
.template-container {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
.camera {
  display: flex;
  justify-content: center;
  align-items: center;
}

.camera video {
  max-width: 90%;
  max-height: 90%;
  border: 1px solid #00FFFF;
  border-radius: 15px;
}

.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  max-height: calc(100vh - 8rem);
  overflow: auto;
}

.result h2 {
  margin-bottom: 1rem;
}

b{
    font-size:20px;
    color:#00FFFF;
    text-transform:uppercase;
}
.label{
  text-align: center;
  color: #00FFFF;
  text-transform: uppercase;
  letter-spacing: 2px;
}


.btn-goevent {
    background-color: #00FFFF;
    color:black;
}

.userage{
  color:yellow;
  font-style: italic;
}
</style>
