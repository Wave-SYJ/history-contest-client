<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-col :span="12">
        <el-button type="primary" @click="handleInsert">添加</el-button>
        <el-button
          type="danger"
          @click="deleteSelectedRow()"
          :disabled="multipleSelection.length == 0"
          >删除选中项</el-button
        >
      </el-col>
    </el-header>
    <el-main style="padding: 0">
      <el-table
        height="100%"
        v-loading="loading"
        :data="studentList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column type="selection" width="30"> </el-table-column>
        <el-table-column prop="sid" label="学号"> </el-table-column>
        <el-table-column prop="cardId" label="一卡通号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.status)" disable-transitions>
              {{ constants[scope.row.status + "_ZH"] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="175">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer style="margin: 10px auto; height: auto">
      <el-pagination
        @size-change="getStudentList"
        @current-change="getStudentList"
        :current-page.sync="currentPage"
        :page-sizes="[50, 100, 150, 200]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-footer>

    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <el-form :model="editData">
        <el-form-item label="学号">
          <el-input v-model="editData.sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="一卡通号">
          <el-input v-model="editData.cardId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            editting = false;
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import userApi from "@/api/user";
import constants from "@/constants";

export default {
  data() {
    return {
      studentList: [],
      constants,
      dialogVisible: false,
      editting: false, // true 表示 inserting
      editData: {},
      loading: false,
      multipleSelection: [],

      pageSize: 50,
      total: 0,
      currentPage: 1
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  },
  created() {
    this.getStudentList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    async deleteSelectedRow() {
      await this.$confirm("此操作将永久删除选中的记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      await userApi.deleteStudents(
        this.multipleSelection.map(value => value.id)
      );
      this.getStudentList();
    },
    async getStudentList() {
      const res = await userApi.getStudentPage(this.currentPage, this.pageSize);
      this.studentList = res.list;
      this.total = res.total;
    },
    getTagType(status) {
      switch (status) {
        case constants.STATUS_NOT_START:
          return "info";
        case constants.STATUS_STARTED:
          return "primary";
        case constants.STATUS_SUBMITTED:
          return "success";
      }
    },
    handleInsert() {
      this.editData = {};
      this.editting = false;
      this.dialogVisible = true;
    },
    handleEdit(index, row) {
      this.editData = { ...row };
      this.editting = true;
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      await this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      await userApi.deleteStudent(row.id);
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.getStudentList();
    },
    async submitEdit() {
      if (this.editting) {
        await userApi.editStudent(this.editData);
      } else {
        this.editData.id = null;
        await userApi.insertStudent(this.editData);
      }
      this.getStudentList();
      this.editting = false;
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss"></style>
