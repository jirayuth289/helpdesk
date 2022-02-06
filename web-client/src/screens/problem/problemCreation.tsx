import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Space,
  PageHeader,
  Button,
  Input,
  Form,
  AutoComplete,
  Select,
} from "antd";
import "./style.css";
import actions from "../../reduxs/problem/action";
import { DataCustomerCreation } from "../../reduxs/problem/reducers";
import actionsCustomer from "../../reduxs/customer/action";
import { StateCustomer } from "../../reduxs/customer/reducers";
import { FormInstance } from "antd/lib/form";

const { createProblem } = actions;
const { searchCustomerByName } = actionsCustomer;
const { Option } = Select;

interface Props extends StateCustomer {
  searchCustomerByName(name: string): Function;
  createProblem(data: DataCustomerCreation, redirect: Function): Function;
  history: any;
  location: any;
}

export class ProblemCreation extends Component<Props, any> {
  formRef = React.createRef<FormInstance>();

  constructor(props: any) {
    super(props);

    const query = new URLSearchParams(this.props.location.search);

    this.state = {
      customerId: parseInt(query.get("customerId") as string),
      customerName: query.get("customerName"),
      showLocationForm: false,
    };
  }

  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      customerName: this.state.customerName,
    });
  }

  onFinish = (values: any) => {
    this.props.createProblem(
      {
        customerId: this.state.customerId,
        type: values.type,
        description: values.description,
        note: values.note,
        location: this.state.showLocationForm
          ? {
              project: values.project,
              addressNo: values.addressNo,
              repairType: values.repairType,
            }
          : undefined,
      },
      () => this.props.history.replace("/home")
    );
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  handleSearch = (value: string) => {
    this.props.searchCustomerByName(value);
  };

  onSelect = (value: string, options) => {
    this.setState({
      customerId: options.key,
    });
  };

  handleChange = (value) => {
    if (value === "แจ้งซ่อม") {
      this.setState({
        showLocationForm: true,
      });
    } else {
      this.setState({
        showLocationForm: false,
      });
    }
  };

  render() {
    return (
      <PageHeader
        className="site-page-header"
        title="แจ้งปัญหา"
        subTitle=""
        onBack={() => window.history.back()}
      >
        <Form
          ref={this.formRef}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="middle"
          wrapperCol={{ md: 10, sm: 24, xs: 24 }}
        >
          <Form.Item
            label="ชื่อลูกค้า"
            name="customerName"
            rules={[
              { required: true, message: "Please input your customer name!" },
            ]}
          >
            <AutoComplete
              size="large"
              options={this.props.dataSearch}
              dropdownMatchSelectWidth={252}
              onSelect={this.onSelect}
              onSearch={this.handleSearch}
            >
              <Input.Search size="large" placeholder="ค้นหา ..." />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            label="ประเภทการแจ้ง"
            name="type"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select size="large" defaultValue="" onChange={this.handleChange}>
              <Option value="แจ้งซ่อม">แจ้งซ่อม</Option>
              <Option value="Complain">Complain</Option>
              <Option value="ร้องเรียน">ร้องเรียน</Option>
              <Option value="สอบถามข้อมูล">สอบถามข้อมูล</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="รายละเอียด"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input.TextArea rows={3} size="large" />
          </Form.Item>

          <Form.Item label="หมายเหตุ" name="note" rules={[{ required: false }]}>
            <Input size="large" />
          </Form.Item>

          {this.state.showLocationForm ? (
            <>
              <Form.Item
                label="โครงการ"
                name="project"
                rules={[
                  { required: true, message: "Please input your project!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="บ้านเลขที่"
                name="addressNo"
                rules={[
                  { required: true, message: "Please input your address no!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="หมวดหมู่แจ้งซ่อม"
                name="repairType"
                rules={[
                  { required: true, message: "Please input your repair type!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </>
          ) : (
            ""
          )}

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
  searchCustomerByName,
  createProblem,
})(ProblemCreation);
