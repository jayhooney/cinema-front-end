<template>
  <div>
    <h1>MOVIE LIST</h1>
    <div class="btn-box">
      <button id="adminMode" v-on:click="adminMode()">
        관리자 모드 : {{ this.isAdmin ? "ON" : "OFF" }}
      </button>
      <button v-if="this.isAdmin" id="addMovie" v-on:click="navigateAddForm()">
        추가
      </button>
    </div>
    <div class="movie-list">
      <colgroup>
        <col width="5%" />
        <col width="10%" />
        <col width="5%" />
        <col width="50%" />
        <col width="25%" />
        <col v-if="this.isAdmin" width="5%" />
      </colgroup>
      <table>
        <thead>
          <tr>
            <th scope="col">개봉일</th>
            <th scope="col">제목</th>
            <th scope="col">평점</th>
            <th scope="col">스틸샷</th>
            <th scope="col">설명</th>
            <th v-if="this.isAdmin" scope="col">관리자 도구</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movieList" :key="index">
            <td>{{ movie.openingDt }}</td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.grade }}</td>
            <td>{{ movie.stillShots }}</td>
            <td>{{ movie.description }}</td>
            <td v-if="this.isAdmin">
              <button id="updateMovie" v-on:click="navigateUpdateForm(movie)">
                수정
              </button>
              <button id="deleteMovie" v-on:click="deleteMovie(movie.seq)">
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mode: "",
      isAdmin: false,
      movieList: null,
      pageNum: 1
    };
  },
  methods: {
    fetchData(pageNum) {
      axios
        .get("/movie?page=" + pageNum)
        .then(res => {
          this.movieList = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    navigateAddForm() {
      this.$router.push({
        name: "add-movie",
        params: { mode: "ADD", movieData: null }
      });
    },
    navigateUpdateForm(movie) {
      console.log(`go to update form with ${JSON.stringify(movie)}`);
      this.$router.push({
        name: "update-movie",
        params: {
          mode: "UPDATE",
          seq: movie.seq,
          openingDate: movie.openingDt,
          title: movie.title,
          grade: movie.grade,
          stillShots: movie.stillShots,
          description: movie.description
        }
      });
    },
    deleteMovie(movieSeq) {
      axios
        .delete(`/movie/${movieSeq}`)
        .then(res => {
          this.fetchData(this.pageNum);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    adminMode() {
      this.isAdmin ? (this.isAdmin = false) : (this.isAdmin = true);
    }
  },
  created() {
    this.fetchData(this.pageNum);
  }
};
</script>

<style>
table {
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #444444;
}
</style>
