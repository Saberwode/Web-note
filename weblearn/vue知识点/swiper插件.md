## swiper插件用法

- #### 首先进行安装

```npm
npm install swiper vue-awesome-swiper@2.6.7 --save
```

- 然后可以在`main.js`中全局注册

```vue
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
```

- 或者是组件内局部注册

```vue
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}
```

我是用的在`main.js`中全局注册的

这个是组件代码

```vue
<template>
  <div class="body">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="item in swiperList" :key="item.id">
        <img :src="item.url" alt="" />
      </swiper-slide>
      <!-- 
      <swiper-slide>
        <img src="../assets/img/2.jpg" alt="" />
      </swiper-slide>

      <swiper-slide>
        <img src="../assets/img/3.jpg" alt="" />
      </swiper-slide>

      <swiper-slide>
        <img src="../assets/img/4.jpg" alt="" />
      </swiper-slide>

      <swiper-slide>
        <img src="../assets/img/1.jpg" alt="" />
      </swiper-slide>

      <swiper-slide>
        <img src="../assets/img/5.jpg" alt="" />
      </swiper-slide> -->
		// 这个就是分页，也就是那个小圆点
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      swiperOptions: {
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: 1000,
        autoplayDisableOnInteraction: false,
        // autoplay: {
        //   delay: 1000,
        //   disableOnInteraction: false,
        // },
      },
      swiperList: [
        {
          id: 1,
          url: require("../assets/img/1.jpg"),
        },
        {
          id: 2,
          url: require("../assets/img/2.jpg"),
        },
        {
          id: 3,
          url: require("../assets/img/3.jpg"),
        },
        {
          id: 4,
          url: require("../assets/img/4.jpg"),
        },
        {
          id: 5,
          url: require("../assets/img/5.jpg"),
        },
      ],
    };
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
img {
  width: 100%;
}
.swiper-pagination {
  position: relative;
  bottom: 10px;
  left: 10px;
}
</style>
```

