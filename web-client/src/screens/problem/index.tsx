import "moment/locale/th";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Tag, Space, PageHeader, Button, Input } from "antd";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import actions from "../../reduxs/problem/action";
import { ProblemSchema, StateProblem } from "../../reduxs/problem/reducers";

const { getDataProblem } = actions;
const { Search } = Input;

interface Props extends StateProblem {
  getDataProblem(keyword: string): Function;
  history: any;
}

export class Problem extends Component<Props, any> {
  componentDidMount() {
    this.props.getDataProblem('');
  }

  onSearch = (value) =>{
    this.props.getDataProblem(value);
  }

  render() {
    return (
      <PageHeader
        className="site-page-header"
        title="รายการแจ้งทั้งหมด"
        subTitle=""
      >
        <Space
          style={{
            width: "100%",
          }}
          direction="vertical"
          size="large"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Search
              size="large"
              placeholder="ค้นหา ข้อมูลปัญหา"
              onSearch={this.onSearch}
              style={{ width: 300 }}
            />
            <Button
              size="large"
              onClick={() => this.props.history.push("/home/new-problem")}
              icon={<PlusOutlined />}
            >
              สร้างใหม่
            </Button>
          </div>
          <Table
            size="large"
            columns={columns}
            dataSource={this.props.data}
            rowKey={(record) => record.problemId}
          />
        </Space>
      </PageHeader>
    );
  }
}

const getStateToProps = ({ problemReducers }) => {
  return { ...problemReducers };
};

export default connect(getStateToProps, { getDataProblem })(Problem);

const columns = [
  {
    title: "วันที่",
    key: "name",
    render: (value: ProblemSchema) => (
      <div>{moment(value.createdAt).format("lll")}</div>
    ),
  },
  {
    title: "ชื่อลูกค้า",
    key: "name",
    render: (value: ProblemSchema) => <div>{value.Customer.customerName}</div>,
  },
  {
    title: "ประเภท",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "รายละเอียด",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "หมายเหตุ",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "โครงการ",
    key: "project",
    render: (value: ProblemSchema) => <div>{value.Location?.project || '-'}</div>,
  },
  {
    title: "เลขที่บ้าน",
    key: "addressNo",
    render: (value: ProblemSchema) => <div>{value.Location?.addressNo || '-'}</div>,
  },
  {
    title: "หมวดหมู่แจ้งซ่อม",
    key: "category",
    render: (value: ProblemSchema) => <div>{value.Location?.repairType || '-'}</div>,
  },
];
