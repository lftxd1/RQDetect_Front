<template>
  <div class="hello">
  <!--表头-->


  <el-row>
    <div style="float: left;margin-left:30px ;">
    <el-input style="width: 200px;" v-model="input" placeholder="输入名称或者描述内容"></el-input>
    <el-button type="success" icon="el-icon-search">搜索</el-button>
    </div>
    <div style="float: right;margin-right: 50px;">
       <el-button type="primary" icon="el-icon-plus">新增</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
         <el-button type="warning" icon="el-icon-download">导出</el-button>

    </div>

  </el-row>

  <!-- <div style="font-size: 24px;">今日报警记录</div> -->

  <!--表体-->
  <div style="margin-left:30px ;margin-top: 20px;border-top: 1px solid black;">
     <el-table
         ref="multipleTable"
         :data="tableData"
         tooltip-effect="dark"
         style="width: 100%"
         @selection-change="handleSelectionChange">
         <el-table-column
           type="selection"
           width="120">
         </el-table-column>

         <el-table-column
              type="index"
              label="ID"
               width="180">
       <template slot-scope="scope">
         <span>{{ scope.row.id}}</span>
       </template>
         </el-table-column>



     <el-table-column
       label="仓库"
       width="180">
       <template slot-scope="scope">
         <span>{{ scope.row.warehouse}}</span>
       </template>
     </el-table-column>




   <el-table-column
       label="报警时间"
       width="280">
       <template slot-scope="scope">
         <i class="el-icon-time"></i>
         <span>{{ scope.row.time }}</span>
       </template>
     </el-table-column>


 <el-table-column
       label="入侵画面"
       width="280">
       <template slot-scope="scope">
         <div class="demo-image__preview">
           <el-image
             style="width: 100px; height: 100px"
             :src="'http://192.168.123.110:8081/'+scope.row.path"
             :preview-src-list="imagelist"
             >
           </el-image>

         </div>
       </template>
     </el-table-column>



     <el-table-column label="操作">
       <template slot-scope="scope">
         <el-button
           size="mini"
           type="primary"
           icon="el-icon-edit"
           @click="handleEdit(scope.$index, scope.row)"></el-button>
         <el-button
           size="mini"
           type="danger"
           icon="el-icon-delete"
           @click="handleDelete(scope.$index, scope.row)"></el-button>
       </template>
     </el-table-column>
   </el-table>
</div>





  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          input:'',
          socket:null,
           tableData:null,
           imagelist:[],
           }
          },
        mounted() {
          this.initData();
          const socketUrl = "ws://192.168.123.110:8080/api/pushMessage/10";
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
             if(msg.data=="photo"){
               that.$message({
                        message: '入侵警告！',
                        type: 'warning'
                      });
               that.initData();
             }
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
   methods: {

     initData(){
           this.axios.get('http://192.168.123.110:8080/intrusion/getAllPhotoByWarehouse?warehouse=器材仓库'+"&token="+localStorage.getItem('token')).then(response => {
             if (response.data.code!=0){
                           this.$message.error(response.data.data);
             }else{
               this.tableData=response.data.data
               for(var i=0;i<this.tableData.length;i++){

                  this.imagelist.push('http://192.168.123.110:8081/'+this.tableData[i].path)
               }
             }

           })

      },


     //编辑和删除
      handleEdit(index, row) {
             console.log(index, row);
           },
           handleDelete(index, row) {
              this.axios.get('http://192.168.123.110:8080/intrusion/deleteIntrusionById?id='+row.id+"&token="+localStorage.getItem('token')).then(response => {
               if (response.data.code!=0){
                  this.$message.error(response.data.data);
               }else{
                  this.initData()
               }



                  })
           },
           //头部多选
            toggleSelection(rows) {
                   if (rows) {
                     rows.forEach(row => {
                       this.$refs.multipleTable.toggleRowSelection(row);
                     });
                   } else {
                     this.$refs.multipleTable.clearSelection();
                   }
                 },
                 handleSelectionChange(val) {
                   this.multipleSelection = val;
                 },



          }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
