import React, { Component } from "react";
import { Form, Input, Modal,DatePicker } from "antd";
const {TextArea} = Input
class AddNewsForm extends Component {

  render() {
    const { visible, onCancel, onOk, form, confirmLoading, modalType } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title={`${modalType} News`}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width="50%"
        okText="Save"
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form {...formItemLayout}>
          {modalType === 'Edit' &&
            <Form.Item label="ID:">
              {getFieldDecorator("id", {
              })(<Input disabled />)}
            </Form.Item>
          }
          <Form.Item label="Heading:">
            {getFieldDecorator("heading", {
              rules: [{ required: true, message: "Please Enter Heading!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<Input placeholder="Heading" />)}
          </Form.Item>

          <Form.Item label="Description:">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "Please Enter Description!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<TextArea placeholder="Description" rows={5} />)}
          </Form.Item>

          <Form.Item label="Date Time:">
            {getFieldDecorator("date_time", {
            rules: [{ required: true, message: "Please Select Date Time!" }]
            })(<DatePicker showTime placeholder="Select Time" />
            )}
          </Form.Item>
          
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddNewsForm" })(AddNewsForm);
