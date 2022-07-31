<template>
  <div class="hello">
  <!--表头-->


    <el-row>
      <div style="float: left;margin-left:30px ;">
      <el-input style="width: 200px;" v-model="input" placeholder="输入名称或者描述内容"></el-input>
      <el-button type="success" icon="el-icon-search">搜索</el-button>
      </div>
      <div style="float: right;margin-right: 50px;">
        <el-button type="primary" icon="el-icon-plus" @click="newUser()">新增</el-button>
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

        <el-table-column
          label="id"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="用户名"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>

      <el-table-column
          label="email"
          width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="角色"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.userGroup}}</span>
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
        label-width="100px"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="name" />
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input v-model="password" />
        </el-form-item>

        <el-form-item label="邮箱：" prop="email" :placeholder="emailMessage">
          <el-input v-model="email" />
        </el-form-item>

        <el-form-item label="角色：" prop="group">
          <el-select v-model="userGroup" placeholder="请选择">
            <el-option
              v-for="item in groupList"

              :key="item.value"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>

<!--          <el-checkbox-group v-model="userGroup">
              <el-checkbox v-for="item in groupList" @change="chooseItem(item.id)" :label="item.name" name="userGroup" />
          </el-checkbox-group> -->
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
      msg: 'Welcome to Your Vue.js App',
      input:'',
      tableData:null,
      formVisible:false,
      userGroup:"",
      name:"",
      groupList:[],
      username:"",
      password:"",
      email:"",
      emailMessage:"xxx",
    }
  },
  mounted() {
      this.init()
  },
  methods: {
    //编辑和删除
    newUser(){
      this.axios.get('http://192.168.123.110:8080/group/getAllGroup'+"?token="+localStorage.getItem('token')).then(response => {
        
        if (response.data.code!=0){
                      this.$message.error(response.data.data);
        }else{
           this.groupList=response.data.data
        }

      })
      this.formVisible = true

    },

    submitForm(formName) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if(!reg.test(this.email)){
        this.$message.error('请输入有效的邮箱');
        //this.emailMessage="请输入有效的邮箱"
      }
        //callback(new Error('请输入有效的邮箱'));
      this.axios.get('http://192.168.123.110:8080/user/register?'+"token="+localStorage.getItem('token')+'&'+'username='+this.name+'&password='+this.password+'&email='+this.email+'&group='+this.userGroup).then
      (response => {
          console.log(response.data)
         if(response.data.code==1){
             this.$message.error(response.data.data)
         }else{
             this.init()
             this.formVisible =false;
         }

      },
      (error) => {
           this.$message.error("提交错误，请检查数据完整性")
        })



    },
    init(){
      var that=this;
      this.axios.get('http://192.168.123.110:8080/user/getAllUser?token='+localStorage.getItem('token')).then(response => {
           if (response.data.code!=0){
               this.$message.error(response.data.data);
           }else{
               var tmp = response.data.data
               that.tableData = tmp;
               console.log(that.tableData)
           }


        })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleClose() {
      this.formVisible = false
    },
    handleDelete(index, row) {
      this.axios.get('http://192.168.123.110:8080/user/deleteUserById?id='+row.id+"&token="+localStorage.getItem('token')).then(response => {
        if(response.data.code==1){
           this.$message.error(response.data.message);
        }else{
          this.init()
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
    }
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
