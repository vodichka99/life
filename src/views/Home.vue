<template>
  <div class="home">
    <div class="container">
      <div class="life-wrapper" :class="{ pointer: !started }">
        <div class="row" v-for="rowNum in rows" :key="rowNum">
          <div
            class="cage"
            v-for="colNum in columns"
            :key="colNum"
            :class="{
              alive: cages.find(
                (item) => item.row == rowNum && item.col == colNum
              )?.alive,
            }"
            @click="reviveCage({ row: rowNum, col: colNum })"
          ></div>
        </div>
      </div>
      <div class="buttons">
        <button class="play pointer" @click="start" :disabled="started">
          Play
        </button>
        <button class="play pointer" @click="stop">
          Stop
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rows: 20,
      columns: 20,
      cages: [],
      started: false,
      intervalDelay: 100,
      interval: null,
    };
  },
  methods: {
    reviveCage(cage) {
      const find = (params) => {
        return this.cages.find((item) => {
          return item.row == params.row && item.col == params.col;
        });
      };
      find(cage).alive = true;
      this.update();
      console.log(find(cage));
    },
    update() {
      this.cages.forEach((cage) => {
        let aliveCagesAround = 0;
        cage.around.forEach((item) => {
          if (this.cages[item].alive) {
            aliveCagesAround += 1;
          }
        });
        if (cage.alive) {
          if (aliveCagesAround < 2 || aliveCagesAround > 3)
            cage.willLive = false;
          else if (aliveCagesAround == 2 || aliveCagesAround == 3)
            cage.willLive = true;
        } else {
          if (aliveCagesAround == 3) cage.willLive = true;
          else cage.willLive = false;
        }
      });
    },
    tick() {
      this.cages.forEach((cage) => {
        if (cage.willLive) cage.alive = true;
        else cage.alive = false;
      });
      if(!this.cages.find(cage => cage.alive)) this.stop()
      this.update();
    },
    start() {
      this.started = true;
      this.interval = setInterval(() => {
        this.tick();
      }, this.intervalDelay);
    },
    stop() {
      this.started = false;
      clearInterval(this.interval);
    },
  },
  mounted() {
    const find = (params) => {
      return this.cages.find((item) => {
        return item.row == params.row && item.col == params.col;
      });
    };
    for (let i = 1; i <= this.rows; i++) {
      for (let i1 = 1; i1 <= this.columns; i1++) {
        this.cages.push({ row: i, col: i1, alive: false, willLive: false });
      }
    }
    this.cages.forEach((cage) => {
      let leftTop = find({ row: cage.row - 1, col: cage.col - 1 });
      let top = find({ row: cage.row - 1, col: cage.col });
      let rightTop = find({ row: cage.row - 1, col: cage.col + 1 });
      let left = find({ row: cage.row, col: cage.col - 1 });
      let right = find({ row: cage.row, col: cage.col + 1 });
      let leftBottom = find({ row: cage.row + 1, col: cage.col - 1 });
      let bottom = find({ row: cage.row + 1, col: cage.col });
      let rightBottom = find({ row: cage.row + 1, col: cage.col + 1 });
      const aroundCages = [
        leftTop,
        top,
        rightTop,
        left,
        right,
        leftBottom,
        bottom,
        rightBottom,
      ];
      const around = [];
      aroundCages.forEach((item) => {
        if (item) around.push(this.cages.indexOf(item));
      });
      cage.around = around;
    });
    console.log(this.cages);
  },
};
</script>
<style lang="scss">
.row {
  display: flex;
}
.cage {
  width: 20px;
  height: 20px;
  border: 1px solid white;
  &.alive {
    background: white;
  }
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.play {
  margin-top: 40px;
  padding: 10px 20px;
  // cursor: pointer;
}
.life-wrapper {
  // cursor: pointer;
}
.pointer {
  cursor: pointer;
}
</style>
