<template>
  <div class="home-wrapper">
    <div class="date-row">
      <div v-for="(item, index) in cardInfoData" :key="index" class="data-col">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="date-block">
            <i :class="[ item.icon ]" :style="{ background: item.color }" class="icon-box" />
            <div class="date-cont">
              <CountTo class="count" :start-val="0" :end-val="item.count" :duration="3000" />
              <p class="title">{{ item.title }}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>


<div style="width: 100%;display: flex;align-items: center;justify-content: center;">

  <img :src="imgSrc"  style="width: 50%;border-radius: 30px;"  />
  <div style="width: 20;margin-left: 50px;">

     <el-button type="primary" @click="openc(true)">开启实时</el-button><br><br><br>
      <el-button type="primary" @click="openc(false)">关闭实时</el-button>

  </div>
</div>


    <!-- <el-row class="date-box" :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title="text" type="pie" :data="chartsPieData" class="data-desc" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <div class="data-desc data-lang-box">
            <div class="data-lang-title">项目语言构成</div>
            <div v-for="(item, index) in langsData" :key="index" class="data-lang-item">
              <label>{{ item.name }}</label>
              <el-progress :percentage="item.value" :stroke-width="16" :color="item.color" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsPie :title="text" type="ring" :data="chartsPieData" class="data-desc" />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="date-box" :gutter="20">
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsBar :title="title" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" :body-style="{padding: '0px'}">
          <ChartsLine :title="title" :data="commonChartsData" class="data-chart" />
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import ChartsPie from '@/components/Charts/ChartsPie'
import ChartsBar from '@/components/Charts/ChartsBar'
import ChartsLine from '@/components/Charts/ChartsLine'
export default {
  name: 'Home',
  components: { CountTo, ChartsPie, ChartsBar, ChartsLine },
  data() {
    return {
      value1:false,
      imgSrc:"",
      text: '用户访问来源',
      title: '近七天用户访问量条形图',
      langsData: [
        { name: 'VUE', value: 45, color: '#2d8cf0' },
        { name: 'ES6', value: 32, color: '#19be6b' },
        { name: 'TS', value: 4, color: '#ff9900' },
        { name: 'LESS', value: 13, color: '#e46cbb' },
        { name: 'HTML', value: 6, color: '#9a66e4' }
      ],
      cardInfoData: [
        { title: '今日点击', icon: 'vue-dsn-icon-dianji', count: 682, color: '#2d8cf0' },
        { title: '新增用户', icon: 'vue-dsn-icon-xinzeng', count: 259, color: '#19be6b' },
        { title: '信息发送', icon: 'vue-dsn-icon-xinfeng', count: 1262, color: '#ff9900' },
        { title: '点赞统计', icon: 'vue-dsn-icon-dianzan', count: 508, color: '#e46cbb' },
        { title: '累计收藏', icon: 'vue-dsn-icon-heart', count: 379, color: '#9a66e4' }
      ],
      chartsPieData: [
        { value: 1920, name: '直接访问' },
        { value: 1169, name: '邮件营销' },
        { value: 986, name: '联盟广告' },
        { value: 621, name: '视频广告' },
        { value: 3256, name: '搜索引擎' }
      ],
      commonChartsData: {
        Mon: 782,
        Tue: 925,
        Wed: 1196,
        Thu: 812,
        Fri: 328,
        Sat: 222,
        Sun: 1080
      },
       socket:null
    }
  }  ,mounted() {
const socketUrl = "ws://192.168.123.110:8080/api/pushMessage/10";
              var sd=parseInt(100000000*Math.random())
             this.imgSrc="http://192.168.123.110:8081/video.jpg?"+sd;
          if(this.socket!=null){
              socket.close();
              socket=null;
          }
          this.socket = new WebSocket(socketUrl);
          //打开事件
          this.socket.onopen = function() {
              console.log("websocket已打开");
          };
          //获得消息事件
          var that=this;
          this.socket.onmessage = function(msg) {
          
            if(msg.data=="livevideo"){
              var sd=parseInt(100000000*Math.random())
              that.imgSrc="http://192.168.123.110:8081/video.jpg?"+sd;
            }

              //发现消息进入,开始处理前端触发逻辑
          };
          //关闭事件
          this.socket.onclose = function() {
              console.log("websocket已关闭");
          };
          //发生了错误事件
          this.socket.onerror = function() {
              console.log("websocket发生了错误");
          }
        },

  methods:{
   openc(flag){
     var order=""
     if(flag==true){
        order="open"
     }else{
       order="cloase"
     }
      var url="http://192.168.123.110:8080/sendUdp?order="+order
     this.axios
       .get(url)
       .then(response => {

           if(flag){
             this.$message({
                showClose: true,
                message: '打开成功'
              });
           }else{
             this.$message({
                showClose: true,
                message: '已关闭'
              });
           }



       })

   }


  }
}
</script>

<style lang="less">
@import "../assets/less/home";
</style>
