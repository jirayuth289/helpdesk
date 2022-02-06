import React, { Component } from "react";
import { connect } from "react-redux";
import {
  PageHeader,
  Button,
  Input,
  Form,
  Select,
} from "antd";
import "./style.css";
import actionsCustomer from "../../reduxs/customer/action";
import { StateCustomer, CustomerData } from "../../reduxs/customer/reducers";
import { FormInstance } from "antd/lib/form"; 

const { createCustomer } = actionsCustomer;

interface Props extends StateCustomer {
  createCustomer(data: CustomerData, redirect: Function): Function;
  history: any;
}

export class CustomerCreation extends Component<Props, any> {
  formRef = React.createRef<FormInstance>();

  onFinish = (values: any) => {
    this.props.createCustomer(
      {
        customerName: values.customerName,
        mobileNumber: values.mobileNumber,
        customerId: undefined,
        createdAt: undefined,
      },
      () => this.props.history.replace("/home/customer")
    );
  };

  render() {
    return (
      <PageHeader
        className="site-page-header"
        title="เพิ่มลูกค้าใหม่"
        subTitle=""
        onBack={() => window.history.back()}
      >
        <Form
          ref={this.formRef}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          autoComplete="off"
          layout="vertical"
          size="middle"
          wrapperCol={{ md: 10, sm: 24, xs: 24 }}
        >
          <Form.Item
            label="ชื่อ"
            name="customerName"
            rules={[
              { required: true, message: "Please input your customer name!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="เบอร์มือถือ"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please input your mobile number!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      </PageHeader>
    );
  }
}

const mapStateToProps = ({ customerReducers }) => {
  return { ...customerReducers };
};

export default connect(mapStateToProps, {
  createCustomer,
})(CustomerCreation);
