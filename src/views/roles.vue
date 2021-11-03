<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card bottom">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item, index) in scope.row.children"
              :key="index"
              :class="['bdbottom', 'vcenter', index == 0 ? 'bdtop' : '']"
            >
              <el-col :span="5">
                <el-tag @close="handleClose(scope.row, item.id)" closable>{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                  :class="['bdbottom', index1 == 0 ? 'bdtop' : '']"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="handleClose(scope.row, item1.id)"
                      closable
                      type="success"
                      >{{ item1.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-tag
                    @close="handleClose(scope.row, item2.id)"
                    closable
                    type="warning"
                    :span="18"
                    v-for="(item2, index2) in item1.children"
                    :key="index2"
                    :class="['bdbottom', index2 == 0 ? '' : 'bdtop']"
                    >{{ item2.authName }}</el-tag
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" prop="index" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button type="success"  icon="el-icon-edit" size="small" @click="revise(scope.row)" >编辑</el-button>
            <el-button type="danger"  icon="el-icon-delete"  size="small"  @click="deletee(scope.row)"  >删除</el-button >
            <el-button type="warning"  icon="el-icon-delete" size="small"  @click="dialog" >分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配" :visible.sync="dialogVisible"  width="30%" :before-close="handleClose" >
      <el-tree :default-expand-all='true' :data="data" show-checkbox node-key="id"  :default-checked-keys='defukey'
      :props="defaultProps">
        </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  async created() {
    let res = await this.http(this.api.roles);
    this.tableData = res.data.data;
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      defukey:[],
       data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'authName',
        }
    };
  },
  methods: {
    async dialog(row){
      this.dialogVisible = true
      
      let res = await this.http(this.api.rights+'/tree');
      this.getLeafkeys(res,this.defukey)
      this.data=res.data.data 
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    async handleClose(xx, yy) {
      console.log(xx, yy);
      let res1 = await this.http(
        this.api.roles + "/" + xx.id + "/rights" + "/" + yy,
        {},
        "delete"
      );
      let res = await this.http(this.api.roles);
      this.tableData = res.data.data;
    },
    getLeafkeys(node,arr){
      if(!node.pid){
        return arr.push(node.id)
      }
      node.children.foreEach(item=>{
        this.getLeafkeys(item,arr)
      })
    }
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
<style scoped lang="scss">
::v-deep .el-card__body {
  padding: 0;
}
::v-deep .el-button {
  margin-bottom: 20px;
}
.bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  margin-top: 15px;
}
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>