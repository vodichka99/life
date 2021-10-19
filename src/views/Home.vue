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
              alive: cages[colNum - 1 + columns * (rowNum - 1)]?.alive,
            }"
            @click="reviveCage(cages[colNum - 1 + columns * (rowNum - 1)])"
          ></div>
        </div>
      </div>
      <div class="buttons">
        <button class="play pointer" @click="start" :disabled="started">
          Play
        </button>
        <button class="play pointer" @click="stop">Stop</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rows: 30,
      columns: 30,
      cages: [],
      started: false,
      intervalDelay: 100,
      interval: null,
    };
  },
  methods: {
    reviveCage(cage) {
      cage.alive = true;
      this.update();
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
      let aliveCages = 0;
      this.cages.forEach((cage) => {
        if (cage.willLive) {
          cage.alive = true;
          aliveCages += 1;
        } else cage.alive = false;
      });
      if (!aliveCages) this.stop();
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
    for (let i = 1; i <= this.rows; i++) {
      for (let i1 = 1; i1 <= this.columns; i1++) {
        this.cages.push({ row: i, col: i1, alive: false, willLive: false });
      }
    }
    this.cages.forEach((cage) => {
      const rowIndex = cage.row - 1;
      const colIndex = cage.col - 1;

      let leftTop =
        colIndex ? this.rows * (rowIndex - 1) + colIndex - 1 : -1;
      let top = rowIndex ? this.rows * (rowIndex - 1) + colIndex : -1;
      let rightTop =
        colIndex != this.columns - 1
          ? this.rows * (rowIndex - 1) + colIndex + 1
          : -1;
      let left = colIndex ? this.rows * rowIndex + colIndex - 1 : -1;
      let right =
        colIndex != this.columns - 1 ? this.rows * rowIndex + colIndex + 1 : -1;
      let leftBottom =
        colIndex ? this.rows * (rowIndex + 1) + colIndex - 1 : -1;
      let bottom =
        rowIndex != this.rows - 1 ? this.rows * (rowIndex + 1) + colIndex : -1;
      let rightBottom =
        colIndex != this.columns - 1
          ? this.rows * (rowIndex + 1) + colIndex + 1
          : -1;
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
        if (item >= 0 && item <= this.cages.length - 1) around.push(item);
      });
      cage.around = around;
    });
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
