<template>
  <div id="movie-from">
    <h2>{{ this.mode }} MOVIE FORM</h2>
    <form>
      <div v-if="this.mode === 'UPDATE'">
        <label>번호 : {{ this.seq }} </label>
      </div>
      <div>
        <label>개봉일 : </label>
        <input type="date" name="openingDate" v-model="movie.openingDate" />
      </div>
      <div>
        <label>제목 : </label>
        <input type="text" name="title" v-model="movie.title" />
      </div>
      <div>
        <label>평점 : </label>
        <input type="number" name="grade" v-model="movie.grade" />
      </div>
      <div>
        <label>스틸샷 : </label>
        <input type="text" name="stillShots" v-model="movie.stillShots" />
      </div>
      <div>
        <label>설명 : </label>
        <input type="text" name="description" v-model="movie.description" />
      </div>
    </form>
    <button v-if="this.mode === 'ADD'" id="addMovie" v-on:click="addMovie()">
      추가
    </button>
    <button
      v-if="this.mode === 'UPDATE'"
      id="updateMovie"
      v-on:click="updateMovie()"
    >
      수정
    </button>
    <button id="cancel" v-on:click="navigateMovie()">취소</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movie: {
        seq: this.seq === null ? 0 : this.seq,
        openingDate: this.openingDate === null ? "" : this.openingDate,
        title: this.title === null ? "" : this.title,
        grade: this.grade === null ? 0 : this.grade,
        stillShots: this.stillShots === null ? "" : this.stillShots,
        description: this.description === null ? "" : this.description
      }
    };
  },
  props: {
    mode: String,
    seq: Number,
    openingDate: String,
    title: String,
    grade: Number,
    stillShots: String,
    description: String
  },
  methods: {
    addMovie() {
      const data = {
        openingDate: this.movie.openingDate,
        title: this.movie.title,
        grade: Number(this.movie.grade),
        stillShots: this.movie.stillShots,
        description: this.movie.description,
        modifier: "root"
      };
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      console.log(data);

      axios
        .post("/movie", data, config)
        .then(res => {
          this.$router.push("/");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      return;
    },
    updateMovie() {
      const data = {
        openingDate: this.movie.openingDate,
        title: this.movie.title,
        grade: Number(this.movie.grade),
        stillShots: this.movie.stillShots,
        description: this.movie.description,
        modifier: "root"
      };
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      console.log(data);

      axios
        .patch(`/movie/${this.seq}`, data, config)
        .then(res => {
          this.$router.push("/");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      return;
    },
    navigateMovie() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
label {
  margin-top: 20px;
  width: 10%;
  display: inline-block;
  text-align: right;
}
input {
  margin-top: 20px;
  width: 80%;
  box-sizing: border-box;
}

button {
  margin-left: 50px;
  margin-top: 20px;
  width: 40%;
}
</style>
