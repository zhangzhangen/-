<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse"> -->
      <!-- <el-radio-button :label="true"> ⇐ </el-radio-button>
      <el-radio-button :label="false"> ⇒ </el-radio-button> -->
    <!-- </el-radio-group> -->
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#373d41"
      text-color="rgb(255, 255, 255)"
      :collapse-transition="true"
      :unique-opened="true"
      :router="true"
    >
      <el-menu-item route="welcome">
        <i :class="icon[0]"></i>
        <span slot="title" @click="rout">welcome</span>
      </el-menu-item>
      <el-submenu
        :index="String(index + 1)"
        v-for="(item, index) in listmenu"
        :key="index"
      >
        <template slot="title">
          <i :class="icon[index + 1]"></i>
          <span slot="title">{{ item.authName }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :route="'/'+item.path"
            :index="String(index + 1 + '-' + index1 + 1)"
            v-for="(item, index1) in item.children"
            :key="index1"
            ><i class="el-icon-menu"></i>{{ item.authName }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  props: ["listmenu"],
  data() {
    return {
      isCollapse: true,
      icon: [
        "el-icon-s-home",
        "el-icon-user-solid",
        "el-icon-s-order",
        "el-icon-s-cooperation",
        "el-icon-s-claim",
        "el-icon-s-platform",
      ],
    };
  },
  methods: {
    rout(){
      this.$router.push('/welcome').catch(err=>err)
    }
  },
};
</script>