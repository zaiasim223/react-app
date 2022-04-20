import React, { Component } from "react";
import { Form, Input, Select, Modal } from "antd";

class AddUserForm extends Component {

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
        title={`${modalType} User`}
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
          <Form.Item label="Firt Name:">
            {getFieldDecorator("first_name", {
              rules: [{ required: true, message: "Please Enter First Name!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<Input placeholder="First Name" />)}
          </Form.Item>
          <Form.Item label="Last Name:">
            {getFieldDecorator("last_name", {
              rules: [{ required: true, message: "Please Enter Last Name!" },
              {whitespace: true, message: 'Invalid Value'}],
            
            })(<Input placeholder="Last Name" />)}
          </Form.Item>

          <Form.Item label="Email:">
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please Enter Email!" },
                { whitespace: true, message: 'Invalid Value' },
                {type: 'email', message: 'Invalid Email'}],
            
            })(<Input placeholder="abc@gmail.com" type="email" />)}
          </Form.Item>

          <Form.Item label="Phone Number:">
            {getFieldDecorator("phone_number", {
              rules: [{ required: true, message: "Please Enter Phone Number!" },
              { len: 11, message: "Max length is 11" }],
            
            })(<Input placeholder="03457885428" type="number" />)}
          </Form.Item>
          {
            modalType === 'Edit' &&
            <div>
                <Form.Item label="Facebook Link:">
                {getFieldDecorator("facebook_link", {
                })(<Input placeholder="facebook.com" disabled={modalType === 'Edit'} />)}
              </Form.Item>
    
              <Form.Item label="Movies:">
                {getFieldDecorator("movies_ids", {
                })(<Input placeholder="23,45" disabled={modalType === 'Edit'} />)}
              </Form.Item>
    
              <Form.Item label="Songs Ids:">
                {getFieldDecorator("songs_ids", {
                })(<Input placeholder="23,45" disabled={modalType === 'Edit'} />)}
              </Form.Item>
    
              <Form.Item label="Books Ids:">
                {getFieldDecorator("books_ids", {
                })(<Input placeholder="23,45" disabled={modalType === 'Edit'} />)}
              </Form.Item>
              </div>
          }


          
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddUserForm" })(AddUserForm);
