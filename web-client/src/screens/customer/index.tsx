import "moment/locale/th";
import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Tag, Space, PageHeader, Button, Input } from "antd";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";
import actions from "../../reduxs/customer/action";
import { CustomerData, StateCustomer } from "../../reduxs/customer/reducers";

const { getAll } = actions;
const { Search } = Input;

interface Props extends StateCustomer {
  getAll(name?: string): Function;
  history: any;
}

export class Customer extends Component<Props, any> {
  componentDidMount() {
    this.props.getAll("");
  }

  onSearch = (value) => {
    this.props.getAll(value);
  };

  render() {
    return (
      <PageHeader
        className="site-page-header"
        title="รายชื่อลูกค้า"
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
              placeholder="ค้นหา ..."
              onSearch={this.onSearch}
              style={{ width: 300 }}
            />
            <Button
              size="large"
              onClick={() => this.props.history.push("/home/new-customer")}
              icon={<PlusOutlined />}
            >
              สร้างใหม่
            </Button>
          </div>
          <Table
            size="large"
            columns={columns}
            dataSource={this.props.data}
            rowKey={(record) => record.customerId as number}
          />
        </Space>
      </PageHeader>
    );
  }
}

const getStateToProps = ({ customerReducers }) => {
  return { ...customerReducers };
};

export default connect(getStateToProps, { getAll })(Customer);

const columns = [
  {
    title: "ชื่อลูกค้า",
    key: "customerName",
    dataIndex: "customerName",
  },
  {
    title: "เบอร์มือถือ",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
  },
  {
    title: "วันที่เพิ่มข้อมูล",
    key: "createdAt",
    render: (value: CustomerData) => (
      <div>{moment(value.createdAt).format("lll")}</div>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (value: CustomerData) => (
      <Link
        to={`/home/new-problem?customerId=${value.customerId}&customerName=${value.customerName}`}
      >
        <Button type="link" danger>
          แจ้งปัญหา
        </Button>
      </Link>
    ),
  },
];
