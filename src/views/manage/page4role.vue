<template>
  <div class="hello">
  <!--表头-->


  <el-row>
    <div style="float: left;margin-left:30px ;">
      <el-input style="width: 200px;" v-model="input" placeholder="输入名称或者描述内容"></el-input>
      <el-button type="success" icon="el-icon-search">搜索</el-button>
    </div>
    <div style="float: right;margin-right: 50px;">
      <el-button type="primary" icon="el-icon-plus" @click="newRole()">新增</el-button>
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
               width="180">
        </el-table-column>

<!--
        <el-table-column
            label="id"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id}}</span>
            </template>
        </el-table-column> -->

        <el-table-column
           label="角色"
           width="180">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.name}}</span>
           </template>
        </el-table-column>

        <el-table-column
           label="数据权限"
           width="180">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.rights}}</span>
           </template>
        </el-table-column>

<!--        <el-table-column
           label="创建日期"
           width="180">
           <template slot-scope="scope">
             <i class="el-icon-time"></i>
             <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
      title="编辑"
      :visible.sync="formVisible"
      width="30%"
      class="dialog-form"
      :before-close="handleClose"
    >
      <el-form
        ref="dialogForm"
        :model="dialogForm"
        label-width="100px"
      >
        <el-form-item label="角色：" prop="name">
          <el-input v-model="dialogForm.name" />
        </el-form-item>

        <el-form-item label="权限：" prop="hobby">
          <el-checkbox-group v-model="dialogForm.hobby">
              <el-checkbox v-for="item in apiList" @change="chooseItem(item.id)" :label="item.name" name="hobby" />
          </el-checkbox-group>
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
import { getToken } from '@/utils/cookie'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input:'',
      tableData: null,
      apiList:[],
      rights:[],
       // 新增/编辑提交表单对象
      dialogForm: {
        name: "",
        phone: undefined,
        married: undefined,
        hobby: []
      },
        // 新增/编辑 弹出框显示/隐藏
        formVisible: false,
        isSubmit: false,
    }
  },
  mounted () {
    this.initData()
  },
   methods: {
    initData(){
      this.axios.get('http://192.168.123.110:8080/group/getAllGroup'+"?token="+localStorage.getItem('token')).then(response => {
     if (response.data.code!=0){
                   this.$message.error(response.data.data);
     }else{
       this.tableData=response.data.data
     }

      })
    },
    chooseItem(id){
      if(this.rights.indexOf(id)==-1){
         this.rights.push(id)
      }else{
         this.rights.splice(this.rights.indexOf(id), 1);
      }
    },
     //编辑和删除
    handleEdit(index, row) {

    },
    handleDelete(index, row) {
      this.axios.get('http://192.168.123.110:8080/group/deleteGroupById?id='+row.id+"&token="+localStorage.getItem('token')).then(response => {
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
    newRole(){
      this.axios.get('http://192.168.123.110:8080/api/getAllApi'+"?token="+localStorage.getItem('token')).then(response => {
        if (response.data.code!=0){
                      this.$message.error(response.data.data);
        }else{
          this.apiList=response.data.data
        }
        
      })
      this.formVisible = true
      this.rights=[]
    },
      // 新增/编辑弹出框 关闭时操作
      handleClose() {
        this.formVisible = false
        this.$refs.dialogForm.resetFields()
      },
      submitForm(formName) {

        this.axios.get('http://192.168.123.110:8080/group/addGroup?name='+this.dialogForm.name+'&rights='+this.rights+"&token="+localStorage.getItem('token'))
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
        })
        this.formVisible = false

      },
      cancleForm() {
        this.$refs.dialogForm.resetFields()
        this.formVisible = false
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
