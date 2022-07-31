<template>
  <div class="hello">
  <!--表头-->


  <el-row>
    <div style="float: left;margin-left:30px ;">
    <el-input style="width: 200px;" v-model="input" placeholder="输入名称或者描述内容"></el-input>
    <el-button type="success" icon="el-icon-search">搜索</el-button>
    </div>
    <div style="float: right;margin-right: 50px;">
       <el-button type="primary" icon="el-icon-plus"  @click="handleCreate">新增</el-button>
        <el-button type="danger" icon="el-icon-delete">删除</el-button>
         <el-button type="warning" icon="el-icon-download">导出</el-button>

    </div>

  </el-row>

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
              label="序号"
               width="120">
         </el-table-column>



<!--     <el-table-column
       label="id"
       width="120">
       <template slot-scope="scope">
         <span>{{ scope.row.id}}</span>
       </template>
     </el-table-column> -->



     <el-table-column
       label="名称"
       width="180">
       <template slot-scope="scope">
         <span>{{ scope.row.name}}</span>
       </template>
     </el-table-column>




     <el-table-column
       label="路径"
       width="180">
       <template slot-scope="scope">
         <span>{{ scope.row.path}}</span>
       </template>
     </el-table-column>


<!--       <el-table-column
            label="参数"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.word==null?'':scope.row.word}}</span>
            </template>
          </el-table-column> -->



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




      <!-- 新增/编辑 弹出栏 -->
      <el-dialog
        title="新增"
        :visible.sync="formVisible"
        width="30%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          :rules="formRules"
          label-width="100px"
        >




          <el-form-item label="名字：" prop="name">
            <el-input v-model="dialogForm.name" />
          </el-form-item>
          <el-form-item label="地址：" prop="path">
            <el-input v-model="dialogForm.path" />
          </el-form-item>


          <div class="footer-item" style="display: flex;justify-content: center;">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>






  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
        return {

          // 新增/编辑提交表单对象
          dialogForm: {

           id:undefined,
            name:undefined,
            path:undefined,
            word:undefined,



          },
          // 新增/编辑 弹出框显示/隐藏
          formVisible: false,
          // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
          formRules: {
            name: [
              { required: true, message: '请输入名字', trigger: 'blur' }
            ],
             id: [
              { required: true, message: '请输入id', trigger: 'blur' },
            ],
            path: [
              { required: true, message: '请输入路径', trigger: 'blur' },
            ],
            word: [
              { required: true, message: '请输入描述文字', trigger: 'blur' },
            ]
          },
          // 防止多次连续提交表单
          isSubmit: false,



          msg: 'Welcome to Your Vue.js App',
          input:'',
           tableData: null,

            }
          },



          mounted() {

             this.initData();

            },



   methods: {

     initData(){
           this.axios.get('http://192.168.123.110:8080/api/getAllApi'+"?token="+localStorage.getItem('token')).then(response => {
           if (response.data.code!=0){
                         this.$message.error(response.data.data);
           }else{
             this.tableData=response.data.data
           }


           })


            },

     // 新建数据
        handleCreate() {
          this.formVisible = true
          this.id=undefined
          this.name=undefined
          this.path=undefined
          this.word=undefined
        },



     // 新增/编辑弹出框 关闭时操作
       handleClose() {
         this.formVisible = false
         this.$refs.dialogForm.resetFields()
       },
       // 新增/编辑表单确认提交
       submitForm(formName) {
        this.axios.get('http://192.168.123.110:8080/api/addApi?name='+this.dialogForm.name+"&path="+this.dialogForm.path+"&token="+localStorage.getItem('token'))
        .then(response => {

          if (response.data.code!=0){
               this.$message.error(response.data.data);
          }

          if(response.data.code==0){

            this.$message({
                message: '添加成功',
                type: 'success'
              });
            this.initData()
          }
        },(error)=>{
          this.$fail({
              message: '添加识别',
              type: 'fail'
            });
        })
        this.formVisible = false
       },
       // 新增/编辑表单取消提交
       cancleForm() {
         this.$refs.dialogForm.resetFields()
         this.formVisible = false
       },




     //编辑和删除
      handleEdit(index, row) {
             console.log(index, row);
      },
     handleDelete(index, row) {
      this.axios.get('http://192.168.123.110:8080/api/deleteApiById?id='+row.id+"&token="+localStorage.getItem('token')).then(response => {
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
