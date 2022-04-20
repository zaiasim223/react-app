import React, { Component } from "react";
import { Form, Input, Modal,DatePicker,Select } from "antd";

// const { TextArea } = Input;
const { Option } = Select;

class AddRewardForm extends Component {
  
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, modalType,
      songsList,
      moviesList,
      quotesList,
      booksList,
      newsList
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const rewardType = getFieldValue('reward_type')
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
        title={`${modalType} Reward`}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width="60%"
        okText="Save"
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form {...formItemLayout} >
          {modalType === 'Edit' &&
            <Form.Item label="ID:">
              {getFieldDecorator("id", {
              })(<Input disabled />)}
            </Form.Item>
          }
          <Form.Item label="Start Time:">
            {getFieldDecorator("start_time", {
              rules: [{ required: true, message: "Please Enter Start Time!" }]
            
            })(<DatePicker
              showTime
              placeholder="Select Start Time"
            />)}
          </Form.Item>

          <Form.Item label="End Time:">
            {getFieldDecorator("end_time", {
              rules: [{ required: true, message: "Please Enter End Time!" }]
            
            })(    <DatePicker
              showTime
              placeholder="Select End Time"
            />)}
          </Form.Item>

          <Form.Item label="Game:">
            {getFieldDecorator("game", {
              rules: [{ required: true, message: "Please Enter Game!" },],
              initialValue: 'Paper Fortune'
            })(<Select
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              
            >
              <Option key={'Paper Fortune'}>Paper Fortune</Option>
              <Option key={'Scratch Lottery Ticket'}>Scratch Lottery Ticket</Option>
              <Option key={'Roll Dice'}>Roll Dice</Option>
              <Option key={'Slot Machine'}>Slot Machine</Option>

            </Select>)}
          </Form.Item>


          <Form.Item label="Reward Type:">
            {getFieldDecorator("reward_type", {
              rules: [{ required: true, message: "Please Enter Reward Type!" },],
              initialValue: 'Song'
            })(   <Select
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue="Song"
              
            >
              <Option key={'Song'}>Song</Option>
              <Option key={'Movie'}>Movie</Option>
              <Option key={'Quote'}>Quote</Option>
              <Option key={'Book'}>Book</Option>
              <Option key={'News'}>News</Option>
            </Select>)}
          </Form.Item>

          <Form.Item label={`${rewardType}:`}>
            {getFieldDecorator("reward", {
              rules: [{ required: true, message: "Please Enter Reward!" },]
            })(   <Select
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              
            >
              {
                rewardType === 'Song' ?
                  songsList?.map(song => <Option key={song.id}>{song.title}</Option>)
                  : rewardType === 'Movie' ?
                    moviesList?.map(movie => <Option key={movie.id}>{movie.name}</Option>)
                    : rewardType === 'Quote' ?
                      quotesList?.map(quote => <Option key={quote.id}>{quote.text}</Option>)
                      : rewardType === 'Book' ?
                        booksList?.map(book => <Option key={book.id}>{book.name}</Option>)
                        : rewardType === 'News' ?
                        newsList?.map(book => <Option key={book.id}>{book.heading}</Option>) : null
              }
            </Select>)}
          </Form.Item>

        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddRewardForm" })(AddRewardForm);
