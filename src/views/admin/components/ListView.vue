<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-col :span="12">
        <el-button type="primary">添加</el-button>
        <el-button type="danger">删除选中项</el-button>
      </el-col>
    </el-header>

    <el-main style="padding: 0">
      <el-table height="100%" tooltip-effect="dark" style="width: 100%">
        <slot name="tableColumns"></slot>

        <el-table-column label="操作" width="175">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer style="margin: 10px auto; height: auto">
      <el-pagination layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-footer>

    <el-dialog title="编辑">
      <el-form>
        <slot name="dialogFormItems"></slot>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            editting = false;
          "
          >取 消</el-button
        >
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  props: []
};
</script>

<style></style>
